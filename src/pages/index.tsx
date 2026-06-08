"use client";

import { useEffect, useState } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Navbar } from "@/components/Navbar";
import { LandingPage } from "@/components/LandingPage";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Dashboard } from "@/components/Dashboard";

type Screen = "landing" | "connect" | "dashboard";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [balance, setBalance] = useState("0.00");
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  // When wallet connects, go to dashboard
  useEffect(() => {
    if (wallet?.account?.address) {
      fetchBalance(wallet.account.address).then(setBalance);
      setScreen("dashboard");
    } else {
      // If wallet disconnects, go back to landing
      if (screen === "dashboard") {
        setScreen("landing");
      }
    }
  }, [wallet]);

  async function fetchBalance(address: string) {
    try {
      const res = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${encodeURIComponent(address)}`
      );
      const data = await res.json();
      const nanos = Number(data?.result ?? 0);
      return (nanos / 1e9).toFixed(2);
    } catch {
      return "0.00";
    }
  }

  function shortAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-4);
  }

  async function handleDisconnect() {
    await tonConnectUI.disconnect();
    setScreen("landing");
  }

  const walletAddress = wallet?.account?.address
    ? shortAddress(wallet.account.address)
    : undefined;

  return (
    <main>
      <Navbar
        walletAddress={walletAddress}
        balance={walletAddress ? balance : undefined}
        onConnect={() => setScreen("connect")}
        onDisconnect={handleDisconnect}
      />

      {screen === "landing" && (
        <LandingPage onStart={() => setScreen("connect")} />
      )}

      {screen === "connect" && !wallet && (
        <ConnectWallet onBack={() => setScreen("landing")} />
      )}

      {screen === "dashboard" && wallet && (
        <Dashboard walletAddress={walletAddress ?? ""} />
      )}
    </main>
  );
}
