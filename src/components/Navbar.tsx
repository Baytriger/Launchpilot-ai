"use client";

import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

interface NavbarProps {
  walletAddress?: string;
  balance?: string;
  onConnect?: () => void;
}

export function Navbar({ walletAddress, balance, onConnect }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 32px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "background 0.3s",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image
          src="/logo.png"
          alt="LaunchPilot AI"
          width={34}
          height={34}
          style={{ objectFit: "contain" }}
        />
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "-0.3px",
            color: "var(--text)",
          }}
        >
          LaunchPilot AI
        </span>
      </div>

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            border: "1px solid var(--border-2)",
            background: "var(--bg-2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sub)",
            transition: "all 0.2s",
          }}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Wallet */}
        {walletAddress ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 13px",
              borderRadius: 9,
              background: "rgba(0,152,234,0.08)",
              border: "1px solid rgba(0,152,234,0.18)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--primary)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
              }}
            />
            <span>{walletAddress}</span>
            {balance && (
              <span style={{ color: "var(--muted)", fontSize: 12 }}>
                · {balance} TON
              </span>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={onConnect}
              style={{
                padding: "8px 16px",
                borderRadius: 9,
                border: "1px solid var(--border-2)",
                background: "transparent",
                cursor: "pointer",
                fontFamily: "var(--font-hubot)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--sub)",
              }}
            >
              Connect Wallet
            </button>
            <button
              onClick={onConnect}
              style={{
                padding: "9px 18px",
                borderRadius: 9,
                border: "none",
                background: "var(--primary)",
                color: "#fff",
                cursor: "pointer",
                fontFamily: "var(--font-hubot)",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Start Building
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
