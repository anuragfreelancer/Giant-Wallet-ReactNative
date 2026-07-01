// src/hooks/useWETH.ts
import { ethers } from 'ethers';
import { useWallet } from './useWallet';

const WETH_ADDRESS = "0x..."; // WETH contract on your chain
const WETH_ABI = [
  "function deposit() payable",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

export function useWETH() {
  const { signer } = useWallet();
  if (!signer) throw new Error("No signer");

  const wethContract = new ethers.Contract(WETH_ADDRESS, WETH_ABI, signer);

  const wrap = async (amountWei: ethers.BigNumberish) => {
    const tx = await wethContract.deposit({ value: amountWei });
    return tx.wait();
  };

  const approve = async (spender: string, amount: ethers.BigNumberish) => {
    const tx = await wethContract.approve(spender, amount);
    return tx.wait();
  };

  return { wrap, approve };
}
