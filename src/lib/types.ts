export interface StartupInput {
  name: string;
  industry: string;
  description: string;
  targetUsers: string;
  tokenSymbol: string;
}

export interface ValidationScore {
  overall: number;
  market: number;
  investorReadiness: number;
}

export interface TokenomicsData {
  name: string;
  supply: number;
  launchPrice: number;
  initialMc: number;
  fdv: number;
  distribution: {
    label: string;
    pct: number;
    color: string;
  }[];
}

export interface ReadinessScore {
  overall: number;
  business: number;
  tokenomics: number;
  liquidity: number;
  community: number;
}

export interface AppState {
  startup: StartupInput | null;
  generated: boolean;
  activeTab: DashTab;
}

export type DashTab =
  | "idea"
  | "validation"
  | "tokenomics"
  | "branding"
  | "whitepaper"
  | "roadmap"
  | "liquidity"
  | "pools"
  | "readiness"
  | "mira";
