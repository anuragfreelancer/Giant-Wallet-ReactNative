
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { ethers } from "ethers";

// === CONFIGURATION ===

// Static wallet private key (TEST ONLY)
const PRIVATE_KEY = "0xb9f2b9b8fe633bbff3586d6523a3950f3a05f4dd490322b78da5870612e5fdfe";

// Ethereum RPC provider (Goerli testnet example, replace with your own)
const PROVIDER_URL = "https://mainnet.infura.io/v3/0556c560569a46a283d23c736af1a7c4";

// Uniswap V2 Router address (Goerli testnet)
const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// Uniswap V2 Router ABI (partial)
const UNISWAP_ROUTER_ABI = [
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)"
];

// Token addresses
const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; // WETH on Goerli
const USDC_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f"; // USDC on Goerli

export default function SwapScreen() {
  const [amountIn, setAmountIn] = useState(""); // ETH amount
  const [loading, setLoading] = useState(false);

  // Create provider + signer
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const swapETHForUSDC = async () => {
    if (!amountIn || isNaN(amountIn) || Number(amountIn) <= 0) {
      Alert.alert("Error", "Please enter a valid ETH amount");
      return;
    }

    setLoading(true);
    try {
      const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, signer);




      
      const amountOutMin = 0; // No slippage protection (unsafe for production)
      const path = [WETH_ADDRESS, USDC_ADDRESS];
      const to = signer.address;
      const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
console.log(router, path, to)

      const tx = await router.swapExactETHForTokens(
        amountOutMin,
        path,
        to,
        deadline,
        { value: ethers.parseEther(amountIn.toString()) }
      );

      console.log("Swap transaction submitted:", tx.hash);
      Alert.alert("Swap Submitted", `Tx Hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log("Swap transaction mined:", receipt.transactionHash);
      Alert.alert("Swap Success", `Transaction mined: ${receipt.transactionHash}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Swap Error", err.message || "Failed to swap tokens");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ETH → USDC Swap (Testnet)</Text>

      <Text style={styles.label}>Static Wallet Address:</Text>
      <Text style={styles.address}>{signer.address}</Text>

      <Text style={styles.label}>Amount in ETH:</Text>
      <TextInput
        placeholder="Enter ETH amount"
        value={amountIn}
        onChangeText={setAmountIn}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title={loading ? "Swapping..." : "Swap ETH → USDC"} onPress={swapETHForUSDC} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  label: { marginTop: 10, fontWeight: "bold" },
  address: { marginBottom: 10, color: "gray" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 20 },
});
