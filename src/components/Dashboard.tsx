"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { LoadingOverlay } from "./LoadingOverlay";
import {
  IdeaTab, ValidationTab, TokenomicsTab, BrandingTab,
  WhitepaperTab, RoadmapTab, LiquidityTab, PoolsTab,
  ReadinessTab, MiraTab,
} from "./DashPanels";
import { DashTab, StartupInput, GeneratedData } from "@/lib/types";

interface DashboardProps {
  walletAddress: string;
}

const EMPTY_STARTUP: StartupInput = {
  name: "",
  industry: "DeFi & Finance",
  customIndustry: "",
  description: "",
  targetUsers: "",
  tokenSymbol: "",
};

const GEN_STEPS = [
  ["Analyzing market landscape...", "Processing startup concept"],
  ["Scoring business fundamentals...", "Evaluating TON ecosystem fit"],
  ["Generating tokenomics model...", "Optimizing distribution strategy"],
  ["Building STON.fi liquidity plan...", "Connecting DEX intelligence"],
  ["Drafting whitepaper sections...", "Compiling investor documentation"],
  ["Finalizing launch readiness score...", "Almost ready"],
];

export function Dashboard({ walletAddress }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashTab>("idea");
  const [startup, setStartup] = useState<StartupInput>(EMPTY_STARTUP);
  const [generated, setGenerated] = useState<GeneratedData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!startup.name || !startup.description || !startup.targetUsers || !startup.tokenSymbol) {
      setError("Please fill in all fields before generating.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startup }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Generation failed");
      }

      const data: GeneratedData = await res.json();
      setGenerated(data);
      setActiveTab("validation");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const next = (tab: DashTab) => setActiveTab(tab);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 65px)" }}>
      <LoadingOverlay show={loading} steps={GEN_STEPS} />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} generated={!!generated} />
      <div style={{ flex: 1, padding: 26, background: "var(--bg)", overflowY: "auto" }}>
        {error && (
          <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#DC2626" }}>
            {error}
          </div>
        )}

        {activeTab === "idea" && (
          <IdeaTab startup={startup} onChange={setStartup} onGenerate={handleGenerate} />
        )}
        {activeTab === "validation" && generated && (
          <ValidationTab data={generated.validation} onNext={() => next("tokenomics")} />
        )}
        {activeTab === "tokenomics" && generated && (
          <TokenomicsTab data={generated.tokenomics} tokenSymbol={startup.tokenSymbol} onNext={() => next("liquidity")} />
        )}
        {activeTab === "branding" && generated && (
          <BrandingTab data={generated.branding} />
        )}
        {activeTab === "whitepaper" && generated && (
          <WhitepaperTab data={generated.whitepaper} startupName={startup.name} onNext={() => next("roadmap")} />
        )}
        {activeTab === "roadmap" && generated && (
          <RoadmapTab data={generated.roadmap} />
        )}
        {activeTab === "liquidity" && generated && (
          <LiquidityTab data={generated.liquidity} tokenSymbol={startup.tokenSymbol} onNext={() => next("pools")} />
        )}
        {activeTab === "pools" && (
          <PoolsTab tokenSymbol={startup.tokenSymbol} onNext={() => next("readiness")} />
        )}
        {activeTab === "readiness" && generated && (
          <ReadinessTab data={generated.readiness} onNext={() => next("mira")} />
        )}
        {activeTab === "mira" && generated && (
          <MiraTab
            startupName={startup.name}
            miraPrompt={generated.miraPrompt}
            data={generated}
          />
        )}

        {/* Show prompt if tab needs generation first */}
        {!generated && activeTab !== "idea" && (
          <div style={{ textAlign: "center", padding: "80px 40px" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Generate your launch plan first
            </div>
            <div style={{ fontSize: 14, color: "var(--sub)", marginBottom: 20 }}>
              Go to the Startup Idea tab, fill in your details, and click Generate.
            </div>
            <button
              onClick={() => setActiveTab("idea")}
              style={{ padding: "10px 20px", borderRadius: 9, border: "none", background: "var(--primary)", color: "#fff", fontFamily: "var(--font-hubot)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Back to Startup Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
