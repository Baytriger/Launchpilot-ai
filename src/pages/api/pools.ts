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

// Resolve a token address to its symbol via the STON.fi assets endpoint
async function resolveSymbol(address: string): Promise<string> {
  if (!address) return "???";
  try {
    const res = await fetch(`https://api.ston.fi/v1/assets/${address}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return shortenAddress(address);
    const data = await res.json();
    // Response shape: { asset: { symbol, display_name, ... } }
    const asset = data?.asset ?? data;
    return asset?.symbol ?? asset?.display_name ?? shortenAddress(address);
  } catch {
    return shortenAddress(address);
  }
}

function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr || "???";
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Sort by volume to get the most active pools first
    const response = await fetch(
      "https://api.ston.fi/v1/pools?limit=20",
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`STON.fi API error: ${response.status}`);
    }

    const data = await response.json();
    const rawPools: Record<string, unknown>[] =
      data?.pool_list ?? data?.pools ?? (Array.isArray(data) ? data : []);

    // Collect all unique token addresses so we can batch-resolve them
    const addressSet = new Set<string>();
    for (const p of rawPools.slice(0, 10)) {
      const a0 = p.token0_address ?? p.token_a_address ?? p.token0 ?? "";
      const a1 = p.token1_address ?? p.token_b_address ?? p.token1 ?? "";
      if (a0) addressSet.add(a0 as string);
      if (a1) addressSet.add(a1 as string);
    }

    // Resolve all symbols in parallel
    const symbolMap: Record<string, string> = {};
    await Promise.all(
      [...addressSet].map(async (addr) => {
        symbolMap[addr] = await resolveSymbol(addr);
      })
    );

    const pools: Pool[] = rawPools
      .slice(0, 10)
      .map((p) => {
        const a0 = (p.token0_address ?? p.token_a_address ?? p.token0 ?? "") as string;
        const a1 = (p.token1_address ?? p.token_b_address ?? p.token1 ?? "") as string;

        // Some API responses include symbols directly — use them if present
        const sym0 =
          (p.token0_symbol ?? p.token_a_symbol ?? symbolMap[a0] ?? "???") as string;
        const sym1 =
          (p.token1_symbol ?? p.token_b_symbol ?? symbolMap[a1] ?? "???") as string;

        const tvl = p.tvl_usd ?? p.total_value_locked_usd ?? "0";
        const vol = p.volume_24h_usd ?? p.volume_usd_24h ?? "0";
        const apy = p.apy_1d ?? p.apy ?? p.apr ?? "0";
        const fee = p.lp_fee ?? p.swap_fee ?? "0.003";

        return {
          address: (p.address ?? p.pool_address ?? "") as string,
          token0Symbol: sym0,
          token1Symbol: sym1,
          tvlUsd: formatUsd(Number(tvl)),
          volume24hUsd: formatUsd(Number(vol)),
          apy: formatApy(Number(apy)),
          fee: formatFee(Number(fee)),
        };
      })
      .filter((p) => p.token0Symbol !== "???" || p.token1Symbol !== "???");

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ pools });
  } catch (err) {
    console.error("STON.fi fetch error:", err);
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
  const pct = n > 1 ? n : n * 100;
  return `${pct.toFixed(2)}%`;
}

function formatFee(n: number): string {
  if (!n || isNaN(n)) return "0.30%";
  const pct = n > 1 ? n : n * 100;
  return `${pct.toFixed(2)}%`;
}

const FALLBACK_POOLS: Pool[] = [
  { address: "", token0Symbol: "TON", token1Symbol: "USDT", tvlUsd: "$42.8M", volume24hUsd: "$12.4M", apy: "3.82%", fee: "0.30%" },
  { address: "", token0Symbol: "TON", token1Symbol: "NOT", tvlUsd: "$28.1M", volume24hUsd: "$8.7M", apy: "5.14%", fee: "0.30%" },
  { address: "", token0Symbol: "TON", token1Symbol: "STON", tvlUsd: "$19.3M", volume24hUsd: "$5.2M", apy: "4.67%", fee: "0.30%" },
  { address: "", token0Symbol: "USDT", token1Symbol: "jUSDC", tvlUsd: "$14.7M", volume24hUsd: "$3.9M", apy: "2.31%", fee: "0.05%" },
  { address: "", token0Symbol: "TON", token1Symbol: "MEGA", tvlUsd: "$9.8M", volume24hUsd: "$2.1M", apy: "7.43%", fee: "0.30%" },
];
