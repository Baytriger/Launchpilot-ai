"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { LoadingOverlay } from "./LoadingOverlay";
import {
  IdeaTab,
  ValidationTab,
  TokenomicsTab,
  BrandingTab,
  WhitepaperTab,
  RoadmapTab,
  LiquidityTab,
  PoolsTab,
  ReadinessTab,
  MiraTab,
} from "./DashPanels";
import { DashTab, StartupInput } from "@/lib/types";

interface DashboardProps {
  walletAddress: string;
}

const DEFAULT_STARTUP: StartupInput = {
  name: "NexaFi",
  industry: "DeFi & Finance",
  description:
    "A decentralized yield optimization protocol on TON that automatically allocates user liquidity across STON.fi pools and Jetton farms to maximize returns with minimal risk, powered by an AI-driven rebalancing engine.",
  targetUsers: "DeFi investors, TON native users",
  tokenSymbol: "NEXA",
};

export function Dashboard({ walletAddress }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashTab>("idea");
  const [startup, setStartup] = useState<StartupInput>(DEFAULT_STARTUP);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    // Simulate AI generation — 4 steps × 650ms + buffer
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setActiveTab("validation");
    }, 4 * 650 + 200);
  };

  const next = (tab: DashTab) => setActiveTab(tab);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 65px)" }}>
      <LoadingOverlay show={loading} />

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div
        style={{
          flex: 1,
          padding: 26,
          background: "var(--bg)",
          overflowY: "auto",
        }}
      >
        {activeTab === "idea" && (
          <IdeaTab
            startup={startup}
            onChange={setStartup}
            onGenerate={handleGenerate}
          />
        )}
        {activeTab === "validation" && (
          <ValidationTab onNext={() => next("tokenomics")} />
        )}
        {activeTab === "tokenomics" && (
          <TokenomicsTab onNext={() => next("liquidity")} />
        )}
        {activeTab === "branding" && <BrandingTab />}
        {activeTab === "whitepaper" && (
          <WhitepaperTab onNext={() => next("roadmap")} />
        )}
        {activeTab === "roadmap" && <RoadmapTab />}
        {activeTab === "liquidity" && (
          <LiquidityTab onNext={() => next("pools")} />
        )}
        {activeTab === "pools" && <PoolsTab onNext={() => next("readiness")} />}
        {activeTab === "readiness" && (
          <ReadinessTab onNext={() => next("mira")} />
        )}
        {activeTab === "mira" && <MiraTab />}
      </div>
    </div>
  );
}
