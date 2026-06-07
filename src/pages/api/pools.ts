import type { NextApiRequest, NextApiResponse } from "next";

export interface Pool {
  address: string;
  token0Symbol: string;
  token1Symbol: string;
  tvlUsd: string;
  volume24hUsd: string;
  apy: string;
  fee: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch live pools from STON.fi public API
    const response = await fetch("https://api.ston.fi/v1/pools?limit=20", {
      headers: { Accept: "application/json" },
      // 10 second timeout
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`STON.fi API error: ${response.status}`);
    }

    const data = await response.json();

    // Normalize the pool data
    // STON.fi returns pool_list array
    const rawPools = data?.pool_list ?? data?.pools ?? data ?? [];

    const pools: Pool[] = rawPools
      .slice(0, 10)
      .map((p: Record<string, unknown>) => {
        // STON.fi field names
        const token0 = (p.token0_symbol ?? p.token_a_symbol ?? "TOKEN") as string;
        const token1 = (p.token1_symbol ?? p.token_b_symbol ?? "TON") as string;
        const tvl = p.tvl_usd ?? p.total_value_locked_usd ?? "0";
        const vol = p.volume_24h_usd ?? p.volume_usd_24h ?? "0";
        const apy = p.apy_1d ?? p.apy ?? p.apr ?? "0";
        const fee = p.lp_fee ?? p.swap_fee ?? "0.003";

        return {
          address: (p.address ?? p.pool_address ?? "") as string,
          token0Symbol: token0,
          token1Symbol: token1,
          tvlUsd: formatUsd(Number(tvl)),
          volume24hUsd: formatUsd(Number(vol)),
          apy: formatApy(Number(apy)),
          fee: formatFee(Number(fee)),
        };
      })
      .filter((p: Pool) => p.token0Symbol && p.token1Symbol);

    // Cache for 60 seconds
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ pools });
  } catch (err) {
    console.error("STON.fi fetch error:", err);
    // Return fallback data if API is down
    return res.status(200).json({ pools: FALLBACK_POOLS, fallback: true });
  }
}

function formatUsd(n: number): string {
  if (!n || isNaN(n)) return "$0";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatApy(n: number): string {
  if (!n || isNaN(n)) return "0.00%";
  // If value looks like it's already a percentage (e.g. 4.5 means 4.5%)
  // vs raw decimal (0.045 means 4.5%)
  const pct = n > 1 ? n : n * 100;
  return `${pct.toFixed(2)}%`;
}

function formatFee(n: number): string {
  if (!n || isNaN(n)) return "0.3%";
  const pct = n > 1 ? n : n * 100;
  return `${pct.toFixed(2)}%`;
}

// Fallback if STON.fi API is unreachable
const FALLBACK_POOLS: Pool[] = [
  { address: "", token0Symbol: "TON", token1Symbol: "USDT", tvlUsd: "$42.8M", volume24hUsd: "$12.4M", apy: "3.82%", fee: "0.30%" },
  { address: "", token0Symbol: "TON", token1Symbol: "NOT", tvlUsd: "$28.1M", volume24hUsd: "$8.7M", apy: "5.14%", fee: "0.30%" },
  { address: "", token0Symbol: "TON", token1Symbol: "STON", tvlUsd: "$19.3M", volume24hUsd: "$5.2M", apy: "4.67%", fee: "0.30%" },
  { address: "", token0Symbol: "USDT", token1Symbol: "jUSDC", tvlUsd: "$14.7M", volume24hUsd: "$3.9M", apy: "2.31%", fee: "0.05%" },
  { address: "", token0Symbol: "TON", token1Symbol: "MEGA", tvlUsd: "$9.8M", volume24hUsd: "$2.1M", apy: "7.43%", fee: "0.30%" },
];
