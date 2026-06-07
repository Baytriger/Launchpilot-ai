"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConnectWalletProps {
  onConnected: (address: string, balance: string) => void;
  onBack: () => void;
}

declare global {
  interface Window {
    TonConnectUI?: unknown;
  }
}

export function ConnectWallet({ onConnected, onBack }: ConnectWalletProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [tcUI, setTcUI] = useState<{
    openModal: () => void;
    onStatusChange: (cb: (w: { account?: { address: string } } | null) => void) => void;
    wallet: { account?: { address: string } } | null;
  } | null>(null);

  useEffect(() => {
    // Dynamically load TON Connect UI
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js";
    script.async = true;
    script.onload = () => {
      try {
        // @ts-ignore
        const ui = new window.TON_CONNECT_UI.TonConnectUI({
          manifestUrl: "https://launchpilot-ai-out5.vercel.app/tonconnect-manifest.json",
          buttonRootId: null, // we control the button ourselves
        });

        ui.onStatusChange((wallet: { account?: { address: string } } | null) => {
          if (wallet?.account?.address) {
            setStatus("idle");
            // Shorten address for display
            const addr = wallet.account.address;
            const short = addr.slice(0, 6) + "..." + addr.slice(-4);
            // Fetch balance via toncenter public API
            fetchBalance(addr).then((bal) => {
              onConnected(short, bal);
            });
          }
        });

        setTcUI(ui);
      } catch (e) {
        console.error("TON Connect init error:", e);
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  async function fetchBalance(address: string): Promise<string> {
    try {
      const res = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${address}`
      );
      const data = await res.json();
      const nanos = Number(data?.result ?? 0);
      const ton = (nanos / 1e9).toFixed(2);
      return ton;
    } catch {
      return "0.00";
    }
  }

  const handleConnect = async () => {
    if (!tcUI) {
      setErrorMsg("TON Connect is still loading. Please wait a moment.");
      setStatus("error");
      return;
    }
    setStatus("connecting");
    setErrorMsg("");
    try {
      await tcUI.openModal();
      setStatus("idle");
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg("Connection cancelled or failed. Please try again.");
    }
  };

  const wallets = [
    { name: "Tonkeeper", sub: "Most widely used TON wallet", bg: "var(--primary)" },
    { name: "TON Space", sub: "Self-custodial · Telegram native", bg: "var(--accent)" },
    { name: "OpenMask", sub: "Browser extension wallet", bg: "#1C1C1E" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 65px)", padding: 40 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: "var(--card)", border: "1px solid var(--border-2)", borderRadius: 18, padding: 44, maxWidth: 400, width: "100%" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <Image src="/logo.png" alt="LaunchPilot AI" width={44} height={44} style={{ objectFit: "contain" }} />
          <button onClick={onBack} style={{ fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-hubot)" }}>
            ← Back
          </button>
        </div>

        <h2 style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.6px", marginBottom: 8, color: "var(--text)" }}>
          Connect TON Wallet
        </h2>
        <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6, marginBottom: 26 }}>
          Connect your wallet to access the venture studio. Your data stays under your full control.
        </p>

        {/* Single connect button — TON Connect handles wallet selection in its modal */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          disabled={status === "connecting"}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: 12,
            border: "none",
            background: status === "connecting" ? "rgba(0,152,234,0.6)" : "var(--primary)",
            color: "#fff",
            cursor: status === "connecting" ? "not-allowed" : "pointer",
            fontFamily: "var(--font-hubot)",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.2px",
            marginBottom: 16,
            transition: "background 0.2s",
          }}
        >
          {status === "connecting" ? "Awaiting wallet..." : "Connect TON Wallet"}
        </motion.button>

        {/* Show supported wallets as info */}
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
          Supported wallets
        </div>
        {wallets.map((w) => (
          <div
            key={w.name}
            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--bg-2)", marginBottom: 7 }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 8, background: w.bg, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{w.name}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{w.sub}</div>
            </div>
          </div>
        ))}

        {status === "error" && (
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#DC2626" }}>
            {errorMsg}
          </div>
        )}

        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 14 }}>
          By connecting, you agree to our Terms of Service.
        </p>
      </motion.div>
    </div>
  );
}
