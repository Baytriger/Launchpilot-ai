"use client";

import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  show: boolean;
  steps?: string[][];
}

const defaultSteps = [
  ["Analyzing market opportunity...", "Scanning TON ecosystem data"],
  ["Generating tokenomics model...", "Optimizing distribution strategy"],
  ["Building STON.fi liquidity plan...", "Connecting DEX intelligence"],
  ["Finalizing launch documentation...", "Calculating readiness scores"],
];

export function LoadingOverlay({
  show,
  steps = defaultSteps,
}: LoadingOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!show) {
      setStepIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    }, 650);
    return () => clearInterval(interval);
  }, [show, steps.length]);

  if (!show) return null;

  const [title, sub] = steps[stepIndex] ?? steps[0];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(var(--bg-rgb, 255,255,255), 0.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>{`
        @keyframes lp-spin { to { transform: rotate(360deg); } }
        .lp-spinner {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid rgba(0,152,234,0.15);
          border-top-color: #0098EA;
          animation: lp-spin 0.75s linear infinite;
          margin-bottom: 14px;
        }
      `}</style>
      <div className="lp-spinner" />
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "var(--primary)",
          letterSpacing: "-0.2px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
        {sub}
      </div>
    </div>
  );
}
