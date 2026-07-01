import axios from "axios";
import { ethers } from "ethers";

// --- Types ---
interface SwapQuote {
  tx?: {
    to: string;
    data: string;
    value: string; // value in wei as a string
  };
  // other metadata (approvalAddress, estimatedTime, etc)
  meta?: {
    approvalAddress?: string;
  };
}

interface GetQuoteParams {
  fromToken: string;
  toToken: string;
  amount: string; // human amount, or smallest unit depending on API
  chainId: number;
  walletAddress: string; // needed when includeTx = true
}

// --- API wrapper: get quote (includeTx = false) ---
async function fetchQuote(params: GetQuoteParams): Promise<SwapQuote> {
  const { fromToken, toToken, amount, chainId } = params;

  // Build request body
  const body = {
    sellAsset: fromToken,
    buyAsset: toToken,
    sellAmount: amount,
    chainId,
    includeTx: false,
    // optionally slippage, providers, etc
  };

  const response = await axios.post("https://api.swapkit.dev/quote", body, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": 'b914c59d-d2e1-460c-beac-92c1ef36ade4', // if required
    },
  });

  return response.data;
}

// --- API wrapper: get quote with tx (includeTx = true) ---
async function fetchQuoteWithTx(params: GetQuoteParams): Promise<SwapQuote> {
  const { fromToken, toToken, amount, chainId, walletAddress } = params;

  const body = {
    sellAsset: fromToken,
    buyAsset: toToken,
    sellAmount: amount,
    chainId,
    includeTx: true,
    sourceAddress: walletAddress,
    destinationAddress: walletAddress,
    // optionally slippage, etc
  };

  const response = await axios.post("https://api.swapkit.dev/quote", body, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": 'b914c59d-d2e1-460c-beac-92c1ef36ade4',
    },
  });

  return response.data;
}

// --- Helper: approve token if needed ---
async function ensureApproval(
  signer: ethers.Signer,
  tokenAddress: string,
  spender: string,
  requiredAmount: bigint
) {
  const erc20Abi = [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
  ];
  const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, signer);

  const owner = await signer.getAddress();
  const currentAllowance = await tokenContract.allowance(owner, spender);
  if (currentAllowance < requiredAmount) {
    const tx = await tokenContract.approve(spender, requiredAmount);
    await tx.wait();
  }
}

// --- Main swap function ---
export const swapWithSwapKit = async ({
  fromToken,
  toToken,
  amount, // human-readable or as per API
  chainId,
  providerUrl,
  privateKey,
}: {
  fromToken: string;
  toToken: string;
  amount: string;
  chainId: number;
  providerUrl: string;
  privateKey: string;
}) => {
  // 1. Setup provider & signer
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const signer = new ethers.Wallet(privateKey, provider);
  const walletAddress = await signer.getAddress();

  // 2. Get a “dry-run” quote first (to inspect metadata, etc)
  const quoteDry = await fetchQuote({
    fromToken,
    toToken,
    amount,
    chainId,
    walletAddress,
  });
  console.log("Dry quote:", quoteDry);

  // Optionally: check price impact, slippage, etc via quoteDry.meta

  // 3. Get the actual quote with tx data
  const quoteWithTx = await fetchQuoteWithTx({
    fromToken,
    toToken,
    amount,
    chainId,
    walletAddress,
  });
  console.log("Quote w/ tx:", quoteWithTx);

  if (!quoteWithTx.tx) {
    throw new Error("Quote missing tx object");
  }

  // 4. Approve token if needed
  if (quoteWithTx.meta?.approvalAddress) {
    const spender = quoteWithTx.meta.approvalAddress;
    // parse the sellAmount into wei units (if needed)
    // We assume API uses smallest unit already; adjust if necessary
    const required = BigInt(quoteWithTx.tx.value || "0"); // or use sellAmount in correct units
    await ensureApproval(signer, fromToken, spender, required);
  }

  // 5. Send the transaction
  const txRequest: ethers.TransactionRequest = {
    to: quoteWithTx.tx.to,
    data: quoteWithTx.tx.data,
    value: BigInt(quoteWithTx.tx.value || "0"),
    // Optionally specify gasLimit, gasPrice / maxFeePerGas etc
    // gasLimit: 300000n,
  };

  const txResponse = await signer.sendTransaction(txRequest);
  console.log("Swap TX sent:", txResponse.hash);

  const receipt = await txResponse.wait();
  console.log("Swap completed in block:", receipt.blockNumber);

  return {
    txResponse,
    receipt,
  };
};
