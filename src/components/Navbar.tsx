"use client";

import Image from "next/image";
import { Moon, Sun, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  walletAddress?: string;
  balance?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function Navbar({ walletAddress, balance, onConnect, onDisconnect }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 16px",
      background: "var(--bg)",
      borderBottom: "1px solid var(--border)",
      position: "sticky", top: 0, zIndex: 100,
      transition: "background 0.3s",
      gap: 8,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -4, borderRadius: 16,
            background: "linear-gradient(135deg, rgba(0,152,234,0.15), rgba(124,58,237,0.15))",
            filter: "blur(6px)",
          }} />
          <Image
            src="/logo.png" alt="LaunchPilot AI"
            width={36} height={36}
            style={{ objectFit: "contain", position: "relative", zIndex: 1 }}
          />
        </div>
        <span style={{
          fontSize: 16, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)",
          whiteSpace: "nowrap",
        }}>
          LaunchPilot <span style={{ color: "var(--primary)" }}>AI</span>
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {/* Dark mode */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          style={{
            width: 34, height: 34, borderRadius: 10,
            border: "1px solid var(--border-2)", background: "var(--bg-2)",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: "var(--sub)", transition: "all 0.2s",
            flexShrink: 0,
          }}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {walletAddress ? (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowWalletMenu(!showWalletMenu)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 10px", borderRadius: 10,
                background: "rgba(0,152,234,0.08)",
                border: "1px solid rgba(0,152,234,0.2)",
                cursor: "pointer", fontFamily: "var(--font-hubot)",
                transition: "all 0.2s", maxWidth: 200,
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#22C55E", display: "inline-block", flexShrink: 0,
              }} />
              <span style={{
                fontSize: 12, fontWeight: 600, color: "var(--primary)",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                maxWidth: 90,
              }}>
                {walletAddress}
              </span>
              {balance && (
                <span style={{
                  fontSize: 11, color: "var(--muted)",
                  background: "var(--bg-2)", padding: "2px 6px",
                  borderRadius: 6, fontWeight: 600, flexShrink: 0,
                  display: "none",
                }}
                  className="balance-badge"
                >
                  {balance} TON
                </span>
              )}
              <ChevronDown size={12} style={{ color: "var(--muted)", flexShrink: 0 }} />
            </button>

            <AnimatePresence>
              {showWalletMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: "absolute", right: 0, top: "calc(100% + 8px)",
                    background: "var(--card)", border: "1px solid var(--border-2)",
                    borderRadius: 12, padding: 6, minWidth: 180,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    zIndex: 200,
                  }}
                >
                  <div style={{
                    padding: "8px 12px", fontSize: 11, color: "var(--muted)",
                    fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px",
                  }}>
                    Connected Wallet
                  </div>
                  <div style={{
                    padding: "6px 12px 10px", fontSize: 12,
                    color: "var(--sub)", borderBottom: "1px solid var(--border)",
                    marginBottom: 4, wordBreak: "break-all",
                  }}>
                    {walletAddress}
                  </div>
                  <button
                    onClick={() => {
                      setShowWalletMenu(false);
                      onDisconnect?.();
                    }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      padding: "9px 12px", borderRadius: 8, border: "none",
                      background: "transparent", cursor: "pointer",
                      fontFamily: "var(--font-hubot)", fontSize: 13,
                      fontWeight: 600, color: "#DC2626",
                      transition: "background 0.15s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "rgba(220,38,38,0.06)")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <LogOut size={14} />
                    Disconnect Wallet
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {showWalletMenu && (
              <div
                style={{ position: "fixed", inset: 0, zIndex: 199 }}
                onClick={() => setShowWalletMenu(false)}
              />
            )}
          </div>
        ) : (
          <>
            <button
              onClick={onConnect}
              style={{
                padding: "7px 12px", borderRadius: 9,
                border: "1px solid var(--border-2)", background: "transparent",
                cursor: "pointer", fontFamily: "var(--font-hubot)",
                fontSize: 12, fontWeight: 500, color: "var(--sub)",
                display: "none",
              }}
              className="nav-secondary-btn"
            >
              Connect Wallet
            </button>
            <button
              onClick={onConnect}
              style={{
                padding: "8px 14px", borderRadius: 9, border: "none",
                background: "var(--primary)", color: "#fff",
                cursor: "pointer", fontFamily: "var(--font-hubot)",
                fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
              }}
            >
              Start Building
            </button>
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 480px) {
          .balance-badge { display: inline-block !important; }
          .nav-secondary-btn { display: block !important; }
        }
        @media (min-width: 768px) {
          nav { padding: 12px 32px !important; }
        }
      `}</style>
    </nav>
  );
}
