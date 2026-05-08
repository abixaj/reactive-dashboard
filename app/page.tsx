"use client";

import { useEffect, useState, useRef } from "react";
import { createPublicClient, http, formatEther } from "viem";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Flame, Activity, Cpu, BarChart3, List, Table } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RPC_URL = "https://mainnet-rpc.rnk.dev/";
const client = createPublicClient({
  chain: { id: 1597, name: "Reactive Network", nativeCurrency: { name: "REACT", symbol: "REACT", decimals: 18 } },
  transport: http(RPC_URL),
});

const formatReact = (wei: bigint) => Number(formatEther(wei)).toFixed(4);

// New helper to make huge numbers readable (fixes the overflow)
const formatLargeNumber = (num: number | string | bigint): string => {
  const n = Number(num);
  if (isNaN(n) || n === 0) return "0";
  if (n >= 1e15) return (n / 1e15).toFixed(2) + "Q";
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString();
};

const chainNames: { [key: string]: string } = {
  "11155111": "Sepolia",
  "84532": "Base Sepolia",
  "1": "Ethereum",
  "43113": "Avalanche Fuji",
  // add more if you see them
};

export default function Dashboard() {
  const [burnData, setBurnData] = useState<{ time: string; burned: number }[]>([]);
  const [cumulativeBurn, setCumulativeBurn] = useState(0);
  const cumulativeRef = useRef(0);

  // 1. Network Stats
  const { data: stats } = useQuery({
    queryKey: ["rnkStat"],
    queryFn: async () => {
      const res: any = await client.request({ method: "rnk_getStat", params: [] });
      return res;
    },
    refetchInterval: 10000,
  });

  // 2. All ReactVMs
  const { data: vms } = useQuery({
    queryKey: ["rnkVms"],
    queryFn: async () => {
      const res: any = await client.request({ method: "rnk_getVms", params: [] });
      return res || [];
    },
    refetchInterval: 15000,
  });

  // 3. Recent RVM Transactions (unchanged)
  const { data: recentRvmTxs } = useQuery({
    queryKey: ["recentRvmTxs", vms],
    enabled: !!vms && vms.length > 0,
    queryFn: async () => {
      const txs: any[] = [];
      const sortedVms = [...vms].sort((a: any, b: any) => Number(b.lastTxNumber) - Number(a.lastTxNumber)).slice(0, 3);
      for (const vm of sortedVms) {
        const rvmId = vm.rvmId;
        const head = Number(vm.lastTxNumber);
        if (head < 5) continue;
        try {
          const res: any = await client.request({
            method: "rnk_getTransactions",
            params: [rvmId, "0x" + Math.max(0, head - 9).toString(16), "0xa"],
          });
          if (res) txs.push(...res.map((t: any) => ({ ...t, rvmId, vmName: vm.rvmId.slice(0, 8) })));
        } catch (e) {}
      }
      return txs.slice(0, 10);
    },
    refetchInterval: 15000,
  });

  // 4. Burn Tracker (last 75 blocks for better recent view)
  const { data: recentBurn } = useQuery({
    queryKey: ["recentBurn"],
    queryFn: async () => {
      const latestBlock = await client.getBlockNumber();
      let totalBurned = 0n;
      const chartPoints: { time: string; burned: number }[] = [];
      const burners = new Map<string, bigint>();

      for (let i = 0; i < 75; i++) {
        const blockNum = Number(latestBlock) - i;
        if (blockNum < 0) break;

        const block = await client.getBlock({ blockNumber: BigInt(blockNum), includeTransactions: true });
        let blockBurn = 0n;

        for (const tx of block.transactions) {
          if (typeof tx === "string") continue;
          const receipt = await client.getTransactionReceipt({ hash: tx.hash });
          const fee = receipt.gasUsed * receipt.effectiveGasPrice;
          blockBurn += fee;
          totalBurned += fee;

          const addr = receipt.to || receipt.from || "unknown";
          burners.set(addr, (burners.get(addr) || 0n) + fee);
        }

        chartPoints.unshift({
          time: new Date(Number(block.timestamp) * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          burned: Number(formatEther(blockBurn)),
        });
      }

      const topBurners = Array.from(burners.entries())
        .sort((a, b) => Number(b[1] - a[1]))
        .slice(0, 5)
        .map(([addr, amount]) => ({
          address: addr,
          burned: Number(formatEther(amount)),
        }));

      setBurnData(chartPoints);
      const newTotal = Number(formatEther(totalBurned));
      cumulativeRef.current += newTotal;
      setCumulativeBurn(cumulativeRef.current);

      return {
        totalInLast75Blocks: newTotal.toFixed(4),
        latestBlock: Number(latestBlock),
        topBurners,
      };
    },
    refetchInterval: 12000,
  });

  const totalOriginTxs = stats?.origin
    ? Object.values(stats.origin).reduce((acc: number, chain: any) => acc + (chain.txCount || 0), 0)
    : 0;

  const totalOriginEvents = stats?.origin
    ? Object.values(stats.origin).reduce((acc: number, chain: any) => acc + (chain.eventCount || 0), 0)
    : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-2xl">⚛️</div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">REACT Dashboard</h1>
              <p className="text-zinc-400">Live Usage • Burn Tracker • ReactVMs</p>
            </div>
          </div>
          <a href="https://reactscan.net/" target="_blank" className="text-sm px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-xl flex items-center gap-2">
            <Activity className="w-4 h-4" />
            View on ReactScan
          </a>
        </header>

        {/* STATS ROW - now with formatted numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Latest Block" value={recentBurn?.latestBlock.toLocaleString() || "—"} icon={<BarChart3 />} color="text-emerald-400" />
          <StatCard title="Origin Tx Processed" value={formatLargeNumber(totalOriginTxs)} icon={<TrendingUp />} color="text-blue-400" />
          <StatCard title="Origin Events Processed" value={formatLargeNumber(totalOriginEvents)} icon={<Activity />} color="text-purple-400" />
          <StatCard title="Active ReactVMs" value={vms?.length || 0} icon={<Cpu />} color="text-orange-400" />
        </div>

        {/* PER-ORIGIN-CHAIN BREAKDOWN - formatted */}
        <div className="mb-8 bg-zinc-900 rounded-3xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Table className="w-5 h-5" /> Per-Origin-Chain Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stats?.origin &&
              Object.entries(stats.origin).map(([chainId, data]: [string, any]) => (
                <div key={chainId} className="bg-zinc-800 rounded-2xl p-4 text-sm">
                  <div className="font-mono text-orange-300">{chainNames[chainId] || `Chain ${chainId}`}</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Tx: {formatLargeNumber(data.txCount)}
                  </div>
                  <div className="text-xs text-zinc-400">
                    Events: {formatLargeNumber(data.eventCount)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* BURN TRACKER */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="w-8 h-8 text-orange-500" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Burn Tracker</h2>
                <p className="text-zinc-400 text-sm">100% of all fees are burned • Real-time deflationary pressure</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-emerald-400">TOTAL BURNED (LIVE RUNNING TOTAL)</div>
                <div className="text-3xl font-mono font-bold text-orange-400">
                  {cumulativeBurn.toFixed(4)} REACT
                </div>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-6">
              <div>
                <p className="text-zinc-400 text-sm">Burned in last 75 blocks</p>
                <p className="text-5xl font-mono font-bold text-orange-400">
                  {recentBurn?.totalInLast75Blocks || "0"} <span className="text-xl text-orange-300">REACT</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 text-sm font-medium">LIVE</p>
                <p className="text-xs text-zinc-500">~every 12 seconds</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={burnData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" stroke="#3b3b40" />
                <YAxis stroke="#3b3b40" />
                <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a" }} />
                <Line type="monotone" dataKey="burned" stroke="#f59e0b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>

            {/* Top Burners */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <List className="w-4 h-4" /> Top Contracts by Burn (last 75 blocks)
              </h3>
              <div className="space-y-2">
                {recentBurn?.topBurners?.map((b: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-2xl px-4 py-3 text-sm">
                    <div className="font-mono text-orange-300">{b.address.slice(0, 12)}…</div>
                    <div className="font-semibold text-orange-400">{b.burned.toFixed(4)} REACT</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - unchanged */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900 rounded-3xl p-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Active ReactVMs
              </h2>
              <div className="space-y-4 max-h-[220px] overflow-auto">
                {vms?.map((vm: any, i: number) => (
                  <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-2xl p-4">
                    <div className="font-mono text-sm text-orange-300">{vm.rvmId.slice(0, 10)}…</div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-400">Last Tx</div>
                      <div className="font-semibold">{Number(vm.lastTxNumber).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Table className="w-5 h-5" /> Recent RVM Transactions
              </h2>
              <div className="space-y-3 max-h-[260px] overflow-auto text-sm">
                {recentRvmTxs && recentRvmTxs.length > 0 ? (
                  recentRvmTxs.map((tx: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-zinc-800 rounded-2xl p-3">
                      <div>
                        <div className="font-mono text-orange-300 text-xs">{tx.vmName}…</div>
                        <div className="text-xs text-zinc-400">Tx #{Number(tx.txNumber || tx.number)}</div>
                      </div>
                      <div className="text-right text-xs text-zinc-400">
                        {tx.hash ? tx.hash.slice(0, 8) + "…" : "—"}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 text-sm">Loading recent RVM transactions…</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-zinc-500 text-sm">
          Built with ❤️ for the Reactive Network • All data from official RPC • 
          Total burned since genesis not available via single RPC call (requires full indexer)
        </footer>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-800 ${color}`}>{icon}</div>
        <div>
          <p className="text-zinc-400 text-sm">{title}</p>
          <p className="text-4xl font-semibold font-mono">{value}</p>
        </div>
      </div>
    </div>
  );
}