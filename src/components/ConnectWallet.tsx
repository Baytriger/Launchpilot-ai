"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ConnectWalletProps {
  onConnect: (walletName: string) => void;
  onBack: () => void;
}

const wallets = [
  {
    name: "Tonkeeper",
    sub: "Most widely used TON wallet",
    bg: "var(--primary)",
  },
  {
    name: "TON Space",
    sub: "Self-custodial · Telegram native",
    bg: "var(--accent)",
  },
  {
    name: "OpenMask",
    sub: "Browser extension wallet",
    bg: "#1C1C1E",
  },
];

export function ConnectWallet({ onConnect, onBack }: ConnectWalletProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 65px)",
        padding: 40,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border-2)",
          borderRadius: 18,
          padding: 44,
          maxWidth: 400,
          width: "100%",
        }}
      >
        {/* Logo + back */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 22,
          }}
        >
          <Image src="/logo.png" alt="LaunchPilot AI" width={36} height={36} />
          <button
            onClick={onBack}
            style={{
              fontSize: 13,
              color: "var(--muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-hubot)",
            }}
          >
            ← Back
          </button>
        </div>

        <h2
          style={{
            fontSize: 21,
            fontWeight: 800,
            letterSpacing: "-0.6px",
            marginBottom: 8,
            color: "var(--text)",
          }}
        >
          Connect TON Wallet
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "var(--sub)",
            lineHeight: 1.6,
            marginBottom: 26,
          }}
        >
          Access the venture studio by connecting your TON wallet. Your data
          remains fully under your control.
        </p>

        {/* Wallet options */}
        {wallets.map((w) => (
          <motion.div
            key={w.name}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onConnect(w.name)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 13,
              padding: "13px 15px",
              borderRadius: 11,
              border: "1px solid var(--border)",
              background: "var(--bg-2)",
              cursor: "pointer",
              marginBottom: 8,
              transition: "border-color 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--primary)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--border)";
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: w.bg,
                flexShrink: 0,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.2px",
                  color: "var(--text)",
                }}
              >
                {w.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{w.sub}</div>
            </div>
            <ChevronRight
              size={16}
              style={{ marginLeft: "auto", color: "var(--muted)" }}
            />
          </motion.div>
        ))}

        <p
          style={{
            fontSize: 11,
            color: "var(--muted)",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          By connecting, you agree to our Terms of Service.
        </p>
      </motion.div>
    </div>
  );
}
