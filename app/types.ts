/**
 * Type definitions for Reactive Dashboard
 * These interfaces ensure type safety across the application
 */

/** Network statistics from rnk_getStat RPC method */
export interface NetworkStat {
    totalTransactions: bigint;
    totalBlocks: bigint;
    activeContracts: number;
    avgBlockTime: number;
}

/** Reactive Virtual Machine data */
export interface ReactVM {
    rvmId: string;
    address: string;
    lastTxNumber: bigint;
    createdAt: number;
    isActive: boolean;
}

/** Transaction data for a ReactVM */
export interface VMTransaction {
    hash: string;
    from: string;
    to: string;
    value: bigint;
    gasUsed: bigint;
    effectiveGasPrice: bigint;
    blockNumber: bigint;
    timestamp: number;
    rvmId?: string;
    vmName?: string;
}

/** Burn data for chart visualization */
export interface BurnData {
    time: string;
    burned: number;
}

/** Top burner address with total burned amount */
export interface TopBurner {
    address: string;
    totalBurned: bigint;
    transactionCount: number;
    percentage: number;
}

/** Aggregated burn metrics for a period */
export interface BurnMetrics {
    totalBurned: bigint;
    averagePerBlock: bigint;
    topBurners: TopBurner[];
    blockCount: number;
    startBlock: number;
    endBlock: number;
}

/** React Query response wrapper */
export interface QueryResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
}

/** Dashboard state for managing UI */
export interface DashboardState {
    selectedView: "stats" | "burn" | "vms";
    isAutoRefresh: boolean;
    refreshInterval: number;
    selectedTimeRange: "1h" | "24h" | "7d" | "all";
}
