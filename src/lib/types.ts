export interface StartupInput {
  name: string;
  industry: string;
  customIndustry?: string;
  description: string;
  targetUsers: string;
  tokenSymbol: string;
}

export interface GeneratedData {
  validation: {
    overallScore: number;
    marketScore: number;
    investorScore: number;
    marketOpportunity: string[];
    competition: string[];
    revenue: string[];
    risks: string[];
    investorQuestions: string[];
  };
  tokenomics: {
    totalSupply: number;
    launchPrice: number;
    initialMc: string;
    fdv: string;
    distribution: { label: string; pct: number; color: string }[];
    utility: string[];
    vesting: string[];
  };
  branding: {
    names: string[];
    taglines: string[];
    positioning: string[];
    visualConcepts: string[];
  };
  whitepaper: {
    executiveSummary: string;
    problemStatement: string;
    solution: string;
    roadmapOverview: string;
  };
  roadmap: {
    month1: string[];
    month3: string[];
    month6: string[];
    month12: string[];
  };
  liquidity: {
    totalBudget: string;
    allocation: { label: string; pct: number; usd: string }[];
    strategy: string[];
  };
  readiness: {
    overall: number;
    business: number;
    tokenomics: number;
    liquidity: number;
    community: number;
    businessNote: string;
    tokenomicsNote: string;
    liquidityNote: string;
    communityNote: string;
    verdict: string;
  };
  miraPrompt: string;
}

export interface Pool {
  address: string;
  token0Symbol: string;
  token1Symbol: string;
  tvlUsd: string;
  volume24hUsd: string;
  apy: string;
  fee: string;
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
