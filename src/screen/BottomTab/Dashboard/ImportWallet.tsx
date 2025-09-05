import { ethers } from "ethers";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Alert, ScrollView, StyleSheet } from "react-native";
const ImportWallet =()=>{
    const [wallet, setWallet] = useState(null)
 const importWalletFromPhrase = (mnemonic: string) => {
    try {
      const importedWallet = ethers.Wallet.fromPhrase(mnemonic.trim());
      setWallet(importedWallet);
      Alert.alert("Wallet Imported", `Address: ${importedWallet.address}`);
    } catch (error) {
      Alert.alert("Invalid Phrase", "Please enter a valid mnemonic phrase");
    }
  };

  // 👉 Import Wallet by Private Key
  const importWalletFromPrivateKey = (privateKey: string) => {
    try {
      const importedWallet = new ethers.Wallet(privateKey);
      setWallet(importedWallet);
      Alert.alert("Wallet Imported", `Address: ${importedWallet.address}`);
    } catch (error) {
      Alert.alert("Invalid Key", "Please enter a valid private key");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Wallet</Text>

      {/* <TouchableOpacity style={styles.card} onPress={createWallet}>
        <Text style={styles.cardTitle}>Create New Wallet</Text>
        <Text style={styles.cardDesc}>
          Generate secret phrase or Swift wallet
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          importWalletFromPhrase(
            "subway narrow grunt danger devote foot chair brother gravity bomb ramp income" // 👉 replace with user input
          )
        }
      >
        <Text style={styles.cardTitle}>Import Wallet (Mnemonic)</Text>
        <Text style={styles.cardDesc}>Restore using secret phrase</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          importWalletFromPrivateKey(
            "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef" // 👉 replace with user input
          )
        }
      >
        <Text style={styles.cardTitle}>Import Wallet (Private Key)</Text>
        <Text style={styles.cardDesc}>Restore using private key</Text>
      </TouchableOpacity>

      {wallet && (
        <View style={styles.walletBox}>
          <Text style={styles.walletTitle}>Current Wallet</Text>
          <Text style={styles.walletText}>Address: {wallet.address}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f4f4f4",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 18, fontWeight: "600" },
  cardDesc: { fontSize: 14, color: "#555" },
  walletBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#eef",
    borderRadius: 12,
  },
  walletTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  walletText: { fontSize: 14, color: "#333" },
});

export default ImportWallet;