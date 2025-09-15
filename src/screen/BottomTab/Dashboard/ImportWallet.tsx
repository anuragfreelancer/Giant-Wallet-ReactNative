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