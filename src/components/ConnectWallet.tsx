"use client";

import Image from "next/image";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ConnectWalletProps {
  onBack: () => void;
}

const wallets = [
  { name: "Tonkeeper", sub: "Most widely used TON wallet", color: "#0098EA" },
  { name: "TON Space", sub: "Self-custodial · Telegram native", color: "#7C3AED" },
  { name: "OpenMask", sub: "Browser extension wallet", color: "#1C1C1E" },
  { name: "MyTonWallet", sub: "Feature-rich TON wallet", color: "#2563EB" },
];

export function ConnectWallet({ onBack }: ConnectWalletProps) {
  const [tonConnectUI] = useTonConnectUI();
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    try {
      await tonConnectUI.openModal();
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "calc(100vh - 65px)", padding: "clamp(16px, 5vw, 40px)",
      background: "var(--bg)",
    }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "var(--card)", border: "1px solid var(--border-2)",
          borderRadius: 20, padding: "clamp(24px, 6vw, 48px)", maxWidth: 420, width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <Image src="/logo.png" alt="LaunchPilot AI" width={48} height={48} style={{ objectFit: "contain" }} />
          <button
            onClick={onBack}
            style={{ fontSize: 13, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-hubot)", fontWeight: 500 }}
          >
            ← Back
          </button>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.6px", marginBottom: 8, color: "var(--text)" }}>
          Connect TON Wallet
        </h2>
        <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.65, marginBottom: 28 }}>
          Connect your TON wallet to access the venture studio. No wallet connection, no access — your wallet is your identity.
        </p>

        {/* Main connect button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleConnect}
          disabled={connecting}
          style={{
            width: "100%", padding: "14px 20px", borderRadius: 12,
            border: "none",
            background: connecting
              ? "rgba(0,152,234,0.5)"
              : "linear-gradient(135deg, #0098EA, #0077C8)",
            color: "#fff", cursor: connecting ? "not-allowed" : "pointer",
            fontFamily: "var(--font-hubot)", fontSize: 15, fontWeight: 700,
            letterSpacing: "-0.2px", marginBottom: 24,
            boxShadow: connecting ? "none" : "0 4px 16px rgba(0,152,234,0.3)",
            transition: "all 0.2s",
          }}
        >
          {connecting ? "Opening wallet selector..." : "Select Wallet & Connect"}
        </motion.button>

        {/* Supported wallets list */}
        <div style={{
          fontSize: 11, fontWeight: 700, color: "var(--muted)",
          textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12,
        }}>
          Supported Wallets
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {wallets.map((w) => (
            <div
              key={w.name}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 14px", borderRadius: 10,
                border: "1px solid var(--border)", background: "var(--bg-2)",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: w.color, flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{w.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{w.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 18, lineHeight: 1.6 }}>
          By connecting, you agree to our Terms of Service.<br />
          Your wallet data is never stored on our servers.
        </p>
      </motion.div>
    </div>
  );
}
