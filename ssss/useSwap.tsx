// src/hooks/useSwap.ts
import { ethers } from 'ethers';


import {
  Pool,
  Route,
  Trade,
  TradeType,
  Percent,
} from '@uniswap/v3-sdk';
import { Token, WETH, Fetcher, CurrencyAmount } from '@uniswap/sdk-core';
import { useWallet } from './useWallet';
import { useWETH } from './useWETH';

const TOKEN_ADDRESS = "0x..."; // UNI or whatever
const POOL_FEE = 3000; // example fee tier 0.3%

export function useSwap() {
  const { provider, signer, account } = useWallet();
  const { wrap, approve } = useWETH();

  const getQuote = async (amountInWei: ethers.BigNumberish) => {
    if (!provider) throw new Error("No provider");
    // Fetch token & pool data
    const token = new Token(1, TOKEN_ADDRESS, 18, 'UNI', 'Uniswap Token'); 
    const weth = WETH[1]; // depending on chain ID

    const pool = await Fetcher.fetchPoolData(weth, token, POOL_FEE, provider);
    const route = new Route([pool], weth, token);
    const trade = await Trade.fromRoute(route, CurrencyAmount.fromRawAmount(weth, amountInWei.toString()), TradeType.EXACT_INPUT);
    const outputAmount = trade.outputAmount.toExact();
    return outputAmount;
  };

  const swap = async (amountInWei: ethers.BigNumberish, slippage: Percent) => {
    if (!signer) throw new Error("No signer");
    // Convert ETH → WETH
    await wrap(amountInWei);

    const token = new Token(1, TOKEN_ADDRESS, 18, 'UNI', 'Uniswap Token');
    const weth = WETH[1];
    const pool = await Fetcher.fetchPoolData(weth, token, POOL_FEE, provider!);
    const route = new Route([pool], weth, token);
    const trade = await Trade.fromRoute(route, CurrencyAmount.fromRawAmount(weth, amountInWei.toString()), TradeType.EXACT_INPUT);

    // Approve the router to spend WETH
    const routerAddress = "<Uniswap V3 router address>";
    const amountOutMinimum = trade.minimumAmountOut(slippage).quotient.toString();
    await approve(routerAddress, amountInWei);

    // Execute swap
    const routerAbi = ["function exactInputSingle(...) payable returns (uint256)"];
    const router = new ethers.Contract(routerAddress, routerAbi, signer);

    const params = {
      tokenIn: weth.address,
      tokenOut: token.address,
      fee: POOL_FEE,
      recipient: account,
      deadline: Math.floor(Date.now()/1000) + 60 * 10,
      amountIn: amountInWei,
      amountOutMinimum: amountOutMinimum,
      sqrtPriceLimitX96: 0,
    };
    const tx = await router.exactInputSingle(params, { value: amountInWei });
    return tx.wait();
  };

  return { getQuote, swap };
}
