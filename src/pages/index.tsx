"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Dashboard } from "@/components/Dashboard";

type Screen = "landing" | "connect" | "dashboard";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0.00");

  const handleConnected = (address: string, bal: string) => {
    setWalletAddress(address);
    setBalance(bal);
    setScreen("dashboard");
  };

  return (
    <main>
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
          onConnected={handleConnected}
          onBack={() => setScreen("landing")}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard walletAddress={walletAddress} />
      )}
    </main>
  );
}
