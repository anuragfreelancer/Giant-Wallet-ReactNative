// src/hooks/useWallet.ts
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// Import a wallet connector for RN, e.g. WalletConnect
import WalletConnectProvider from "@walletconnect/react-native"; // (or the community version)

export function useWallet() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connect = async () => {
    // set up WalletConnect or other RN wallet integration
    const wcProvider = new WalletConnectProvider({
      // configuration
    });
    await wcProvider.enable();
    const web3Provider = new ethers.providers.Web3Provider(wcProvider as any);
    setProvider(web3Provider);
    const signer = web3Provider.getSigner();
    setSigner(signer);
    const addr = await signer.getAddress();
    setAccount(addr);
  };

  return { provider, signer, account, connect };
}
