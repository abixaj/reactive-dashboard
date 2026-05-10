/**
 * Application Constants
 * Centralized configuration for the Reactive Dashboard
 */

// ============== BLOCKCHAIN CONFIGURATION ==============

/** Reactive Network RPC endpoint */
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://mainnet-rpc.rnk.dev/";

/** Reactive Network Chain ID */
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "1597");

/** Network name for display */
export const NETWORK_NAME = "Reactive Network";

/** Native currency symbol */
export const CURRENCY_SYMBOL = "REACT";

/** Currency decimal places */
export const DECIMALS = 18;

// ============== DATA FETCHING CONFIGURATION ==============

/** Number of blocks to index for burn analysis */
export const BLOCKS_TO_INDEX = 75;

/** Refetch interval for network stats (milliseconds) */
export const REFETCH_INTERVAL_STATS = 10000; // 10 seconds

/** Refetch interval for VMs list (milliseconds) */
export const REFETCH_INTERVAL_VMS = 15000; // 15 seconds

/** Refetch interval for recent transactions (milliseconds) */
export const REFETCH_INTERVAL_TRANSACTIONS = 15000; // 15 seconds

/** Number of top VMs to fetch transaction history for */
export const TOP_VMS_LIMIT = 3;

/** Number of recent transactions to display */
export const RECENT_TRANSACTIONS_LIMIT = 10;

// ============== UI CONFIGURATION ==============

/** Page title */
export const PAGE_TITLE = "REACT Dashboard • Usage + Burn Tracker";

/** Page description */
export const PAGE_DESCRIPTION = "Live Reactive Network usage & $REACT burn tracker with real-time statistics and ReactVM explorer";

/** Theme colors (if needed for future enhancements) */
export const COLORS = {
    primary: "#3b82f6", // blue
        success: "#10b981", // green
        warning: "#f59e0b", // amber
        danger: "#ef4444", // red
        muted: "#6b7280", // gray
      };

// ============== FORMATTING CONFIGURATION ==============

/** Decimal places for displaying REACT amounts */
export const REACT_DISPLAY_DECIMALS = 4;

/** Number format options for large numbers */
export const LARGE_NUMBER_THRESHOLDS = {
  QUADRILLION: 1e15,
  TRILLION: 1e12,
  BILLION: 1e9,
  MILLION: 1e6,
  THOUSAND: 1e3,
} as const;

// ============== ERROR MESSAGES ==============

export const ERROR_MESSAGES = {
  RPC_FAILED: "Failed to connect to RPC endpoint. Please check your connection.",
  FETCH_STATS_FAILED: "Failed to fetch network statistics.",
  FETCH_VMS_FAILED: "Failed to fetch ReactVM list.",
  FETCH_TRANSACTIONS_FAILED: "Failed to fetch transactions.",
  INVALID_BLOCK: "Invalid block number provided.",
} as const;

// ============== SUCCESS MESSAGES ==============

export const SUCCESS_MESSAGES = {
  DATA_LOADED: "Data loaded successfully.",
  AUTO_REFRESH_ENABLED: "Auto-refresh enabled.",
  AUTO_REFRESH_DISABLED: "Auto-refresh disabled.",
} as const;
