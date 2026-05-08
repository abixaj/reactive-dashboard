const { createPublicClient, http } = require("viem");
const fs = require("fs");

const RPC_URL = "https://mainnet-rpc.rnk.dev/";
const client = createPublicClient({ chain: { id: 1597 }, transport: http(RPC_URL) });

const STATE_FILE = "./burn-indexer-state.json";
const TOTAL_FILE = "./total-burned.json";

const BLOCKS_TO_INDEX = 200000;   // change to 100000 if you want it faster for testing

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("🚀 Starting Reactive Network Burn Indexer (recent 200k blocks)...");

  // Force clean start by ignoring old state
  let total = 0n;
  const latestBlock = Number(await client.getBlockNumber());
  console.log(`Latest block: ${latestBlock.toLocaleString()}`);

  const startBlock = Math.max(0, latestBlock - BLOCKS_TO_INDEX);
  console.log(`Indexing blocks ${startBlock.toLocaleString()} → ${latestBlock.toLocaleString()}`);

  for (let i = startBlock; i <= latestBlock; i++) {
    if (i % 500 === 0) {
      console.log(`✅ Processed ${i.toLocaleString()} / ${latestBlock.toLocaleString()}`);
      fs.writeFileSync(STATE_FILE, JSON.stringify({ lastProcessedBlock: i, totalBurnedWei: total.toString() }));
    }

    try {
      const block = await client.getBlock({ blockNumber: BigInt(i), includeTransactions: true });

      for (const tx of block.transactions) {
        if (typeof tx === "string") continue;
        const receipt = await client.getTransactionReceipt({ hash: tx.hash });
        const fee = receipt.gasUsed * receipt.effectiveGasPrice;
        total += fee;
      }

      await sleep(8); // gentle on public RPC
    } catch (err) {
      console.log(`⚠️ Skipped block ${i}`);
      await sleep(50);
    }
  }

  const totalReact = Number(total) / 1e18;

  fs.writeFileSync(STATE_FILE, JSON.stringify({ lastProcessedBlock: latestBlock, totalBurnedWei: total.toString() }));
  fs.writeFileSync(TOTAL_FILE, JSON.stringify({ 
    totalBurned: totalReact.toFixed(6), 
    blocksIndexed: BLOCKS_TO_INDEX,
    indexedUpToBlock: latestBlock 
  }));

  console.log("\n🎉 INDEXER FINISHED!");
  console.log(`Total $REACT burned in last ${BLOCKS_TO_INDEX.toLocaleString()} blocks: ${totalReact.toFixed(4)} REACT`);
  console.log(`Saved to total-burned.json`);
}

main().catch(console.error);