"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Dashboard } from "@/components/Dashboard";
import { LoadingOverlay } from "@/components/LoadingOverlay";

type Screen = "landing" | "connect" | "dashboard";

const CONNECT_STEPS = [
  ["Connecting to wallet...", "Verifying TON wallet signature"],
  ["Authenticated.", "Loading your workspace"],
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance] = useState("142.5");

  const addresses = ["UQA4k...9mX", "EQB3x...f7Kp", "UQCzZ...m2Nt"];

  const handleConnect = (walletName: string) => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setWalletAddress(addresses[Math.floor(Math.random() * addresses.length)]);
      setScreen("dashboard");
    }, 1500);
  };

  return (
    <main>
      <LoadingOverlay show={connecting} steps={CONNECT_STEPS} />

      <Navbar
        walletAddress={screen === "dashboard" ? walletAddress : undefined}
        balance={screen === "dashboard" ? balance : undefined}
        onConnect={() => setScreen("connect")}
      />

      {screen === "landing" && (
        <LandingPage onStart={() => setScreen("connect")} />
      )}

      {screen === "connect" && (
        <ConnectWallet
          onConnect={handleConnect}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard walletAddress={walletAddress} />
      )}
    </main>
  );
}
