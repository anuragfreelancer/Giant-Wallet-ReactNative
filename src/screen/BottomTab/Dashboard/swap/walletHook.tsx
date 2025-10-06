import { BrowserProvider } from "ethers";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";
import { useState } from "react";

export function useSigner() {
  const { provider: wcProvider, open } = useWalletConnectModal();
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);

  const connectWallet = async () => {
    await open();

    if (wcProvider) {
      const web3Provider = new BrowserProvider(wcProvider);

      const signer = await web3Provider.getSigner();
      const network = await web3Provider.getNetwork();

      setSigner(signer);
      setChainId(network.chainId);

      console.log("Signer address:", await signer.getAddress());
      console.log("Chain ID:", network.chainId);

      return { signer, chainId: network.chainId };
    }
  };

  const getSigner = () => signer;

  return { connectWallet, getSigner, chainId };
}
