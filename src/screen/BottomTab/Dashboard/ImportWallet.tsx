import { ethers } from "ethers";
import { useState } from "react";
import { 
  Text, 
  TouchableOpacity, 
  View, 
  TextInput,
  Alert, 
  ScrollView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import { color } from "../../../constant";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import LoadingModal from "../../../utils/Loader";

const ImportWallet = () => {
  const [wallet, setWallet] = useState(null);
  const [mnemonic, setMnemonic] = useState("");
  const [isImporting, setIsImporting] = useState(false);
const [loading, setLoading] = useState(false)
  const importWalletFromPhrase = () => {
    if (!mnemonic.trim()) {
      Alert.alert("Error", "Please enter your mnemonic phrase");
      return;
    }

    setIsImporting(true);
    setLoading(true)
    try {
      setLoading(true)
      const importedWallet = ethers.Wallet.fromPhrase(mnemonic.trim());
      setWallet(importedWallet);
      Alert.alert("Success", "Wallet imported successfully!");
console.log(importedWallet)

    } catch (error) {
      Alert.alert("Invalid Phrase", "Please check your mnemonic phrase and try again");


    } finally {
      setIsImporting(false);
      setLoading(false)

    }
  };

  const clearInput = () => {
    setMnemonic("");
    setWallet(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <LoadingModal/>}
      <StatusBarComponent/>
      <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <CustomHeader label={""} menuIcon={imageIndex.back}/>

        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.header}>Import Wallet</Text>
          <Text style={styles.subHeader}>Enter your recovery phrase</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={mnemonic}
              onChangeText={setMnemonic}
              placeholder="Enter your 12 or 24-word recovery phrase"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isImporting}
            />

            {mnemonic.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
                <Text style={styles.clearText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.note}>
            Typically 12 or 24 words separated by single spaces
          </Text>

          <TouchableOpacity
            style={[styles.importButton, isImporting && styles.importButtonDisabled]}
            onPress={importWalletFromPhrase}
            disabled={isImporting}
          >
            <Text style={styles.importButtonText}>
              {isImporting ? "Importing..." : "Import Wallet"}
            </Text>
          </TouchableOpacity>

          {wallet && (
            <View style={styles.walletBox}>
              <Text style={styles.walletTitle}>Wallet Imported Successfully</Text>
              <Text style={styles.walletText}>
                Address: {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
              </Text>
              <Text style={styles.walletSubText}>
                Your wallet is now ready to use
              </Text>
            </View>
          )}

          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Important Security Notice</Text>
            <Text style={styles.warningText}>
              • Never share your recovery phrase with anyone{'\n'}
              • Make sure nobody is watching your screen{'\n'}
              • This phrase gives full access to your wallet{'\n'}
              • Only enter your phrase in trusted applications
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
  },
  header: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 8,
    color: '#333'
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    paddingRight: 40,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top'
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold'
  },
  note: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24
  },
  importButton: {
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24
  },
  importButtonDisabled: {
    backgroundColor: '#ac7878ff'
  },
  importButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  walletBox: {
    padding: 16,
    backgroundColor: '#e6f7ff',
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  walletTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8,
    color: '#007AFF'
  },
  walletText: { 
    fontSize: 14, 
    color: "#333",
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace'
  },
  walletSubText: {
    fontSize: 14,
    color: '#666'
  },
  warningBox: {
    padding: 16,
    backgroundColor: '#fff8e6',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107'
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#856404'
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20
  }
});

export default ImportWallet;


// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// import { ethers } from "ethers";

// // === CONFIGURATION ===

// // Static wallet private key (TEST ONLY)
// const PRIVATE_KEY = "0xb9f2b9b8fe633bbff3586d6523a3950f3a05f4dd490322b78da5870612e5fdfe";

// // Ethereum RPC provider (Goerli testnet example, replace with your own)
// // const PROVIDER_URL = "https://mainnet.infura.io/v3/0556c560569a46a283d23c736af1a7c4";
// const PROVIDER_URL = "https://palm-testnet.infura.io/v3/0556c560569a46a283d23c736af1a7c4";

// // Uniswap V2 Router address (Goerli testnet)
// const UNISWAP_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

// // Uniswap V2 Router ABI (partial)
// const UNISWAP_ROUTER_ABI = [
//   "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) payable returns (uint[] memory amounts)"
// ];

// // Token addresses
// const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; // WETH on Goerli
// const USDC_ADDRESS = "0x07865c6e87b9f70255377e024ace6630c1eaa37f"; // USDC on Goerli

// export default function SwapScreen() {
//   const [amountIn, setAmountIn] = useState(""); // ETH amount
//   const [loading, setLoading] = useState(false);

//   // Create provider + signer
//   const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
//   const signer = new ethers.Wallet(PRIVATE_KEY, provider);

//   const swapETHForUSDC = async () => {
//     if (!amountIn || isNaN(amountIn) || Number(amountIn) <= 0) {
//       Alert.alert("Error", "Please enter a valid ETH amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, signer);
//       const amountOutMin = 0; // No slippage protection (unsafe for production)
//       const path = [WETH_ADDRESS, USDC_ADDRESS];
//       const to = signer.address;
//       const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
//       console.log(router, path, to)

//       const tx = await router.swapExactETHForTokens(
//         amountOutMin,
//         path,
//         to,
//         deadline,
//         { value: ethers.parseEther(amountIn.toString()) }
//       );

//       console.log("Swap transaction submitted:", tx.hash);
//       Alert.alert("Swap Submitted", `Tx Hash: ${tx.hash}`);
//       const receipt = await tx.wait();
//       console.log("Swap transaction mined:", receipt.transactionHash);
//       Alert.alert("Swap Success", `Transaction mined: ${receipt.transactionHash}`);
//     } catch (err) {
//       console.error(err);
//       Alert.alert("Swap Error", err.message || "Failed to swap tokens");
//     }
//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>ETH → USDC Swap (Testnet)</Text>

//       <Text style={styles.label}>Static Wallet Address:</Text>
//       <Text style={styles.address}>{signer.address}</Text>

//       <Text style={styles.label}>Amount in ETH:</Text>
//       <TextInput
//         placeholder="Enter ETH amount"
//         value={amountIn}
//         onChangeText={setAmountIn}
//         keyboardType="numeric"
//         style={styles.input}
//       />

//       <Button title={loading ? "Swapping..." : "Swap ETH → USDC"} onPress={swapETHForUSDC} disabled={loading} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   header: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   label: { marginTop: 10, fontWeight: "bold" },
//   address: { marginBottom: 10, color: "gray" },
//   input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 20 },
// });
