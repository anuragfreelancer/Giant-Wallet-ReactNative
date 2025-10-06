import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Clipboard,
  Modal,
} from 'react-native';
import { ethers } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';

interface WalletCreationProps {
  existingMnemonic?: string;
  onWalletCreated?: (walletData: any) => void;
  onBack?: () => void;
}

const WalletCreation: React.FC<WalletCreationProps> = ({
  existingMnemonic,
  onWalletCreated,
  onBack,
}) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [walletData, setWalletData] = useState<any>(null);
  const [mnemonic, setMnemonic] = useState(existingMnemonic || '');
  const [confirmedWords, setConfirmedWords] = useState<string[]>([]);
  const [showMnemonic, setShowMnemonic] = useState(false);

  // Create wallet function
  const createWallet = async (providedMnemonic?: string) => {
    setLoading(true);
    
    setTimeout(async () => {
      try {
        let wallet;
        
        if (providedMnemonic) {
          // Use provided mnemonic
          wallet = ethers.Wallet.fromPhrase(providedMnemonic);
        } else {
          // Create new random wallet
          wallet = ethers.Wallet.createRandom();
        }

        console.log("Address:", wallet.address);
        console.log("Private Key:", wallet.privateKey);
        console.log("Mnemonic:", wallet.mnemonic?.phrase);

        const walletData = {
          address: wallet.address,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic?.phrase,
        };

        setWalletData(walletData);
        
        // Save to storage
        // await AsyncStorage.setItem("wallet", JSON.stringify(walletData));
        
        // Callback if provided
        // onWalletCreated?.(walletData);
        
        // Move to mnemonic display step
        setStep(2);
        
      } catch (err) {
        console.error("Wallet creation failed:", err);
        Alert.alert("Error", "Failed to create wallet. Please check your mnemonic phrase.");
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  // Initialize with existing mnemonic
  useEffect(() => {
    if (existingMnemonic) {
      createWallet(existingMnemonic);
    }
  }, [existingMnemonic]);

  // Handle new wallet creation
  const handleCreateNewWallet = () => {
    createWallet();
  };

  // Handle import with mnemonic
  const handleImportWallet = () => {
    if (!mnemonic.trim()) {
      Alert.alert("Error", "Please enter your mnemonic phrase");
      return;
    }
    
    // Basic validation
    const words = mnemonic.trim().split(' ');
    if (words.length !== 12 && words.length !== 24) {
      Alert.alert("Error", "Mnemonic must be 12 or 24 words");
      return;
    }
    
    createWallet(mnemonic);
  };

  // Copy mnemonic to clipboard
  const copyMnemonic = () => {
    if (walletData?.mnemonic) {
      Clipboard.setString(walletData.mnemonic);
      Alert.alert("Copied", "Mnemonic copied to clipboard!");
    }
  };

  // Confirm mnemonic words
  const confirmMnemonicWord = (word: string, index: number) => {
    const newConfirmed = [...confirmedWords];
    newConfirmed[index] = word;
    setConfirmedWords(newConfirmed);
  };

  // Verify mnemonic confirmation
  const verifyConfirmation = () => {
    const originalWords = walletData.mnemonic.split(' ');
    const isCorrect = confirmedWords.every((word, index) => word === originalWords[index]);
    
    if (isCorrect) {
      setStep(4); // Success step
    } else {
      Alert.alert("Error", "Some words are incorrect. Please try again.");
    }
  };

  // Render mnemonic words in grid
  const renderMnemonicGrid = (mnemonicPhrase: string, interactive = false) => {
    const words = mnemonicPhrase.split(' ');
    
    return (
      <View style={styles.mnemonicGrid}>
        {words.map((word, index) => (
          <View key={index} style={styles.mnemonicWordContainer}>
            <Text style={styles.wordIndex}>{index + 1}.</Text>
            {interactive ? (
              <TextInput
                style={styles.wordInput}
                value={confirmedWords[index] || ''}
                onChangeText={(text) => confirmMnemonicWord(text, index)}
                placeholder={`Word ${index + 1}`}
                // secureTextEntry
              />
            ) : (
              <TouchableOpacity
                style={[styles.wordButton, showMnemonic && styles.wordButtonRevealed]}
                onLongPress={copyMnemonic}
              >
                <Text style={showMnemonic ? styles.wordTextRevealed : styles.wordText}>
                  {showMnemonic ? word : '••••••'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    );
  };

  // Step 1: Welcome/Import screen
  if (step === 1 && !existingMnemonic) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Create New Wallet</Text>
            <Text style={styles.subtitle}>
              Create a new wallet or import an existing one using your mnemonic phrase
            </Text>
          </View>

          {/* Create New Wallet */}
          <TouchableOpacity style={styles.optionCard} onPress={handleCreateNewWallet}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>🆕</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Create New Wallet</Text>
              <Text style={styles.optionDescription}>
                Generate a new wallet with a random mnemonic phrase
              </Text>
            </View>
          </TouchableOpacity>

          {/* Import Wallet */}
          <View style={styles.optionCard}>
            <View style={styles.optionIcon}>
              <Text style={styles.optionIconText}>📥</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Import Wallet</Text>
              <Text style={styles.optionDescription}>
                Restore using your existing mnemonic phrase
              </Text>
              
              <TextInput
                style={styles.mnemonicInput}
                value={mnemonic}
                onChangeText={setMnemonic}
                placeholder="Enter your 12 or 24 word mnemonic phrase"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                secureTextEntry
              />
              
              <TouchableOpacity 
                style={styles.importButton}
                onPress={handleImportWallet}
              >
                <Text style={styles.importButtonText}>Import Wallet</Text>
              </TouchableOpacity>
            </View>
          </View>

          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Loading Modal */}
        <Modal visible={loading} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={color.primary} />
              <Text style={styles.loadingText}>Creating wallet...</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // Step 2: Show mnemonic phrase
  if (step === 2 && walletData) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Secret Recovery Phrase</Text>
            <Text style={styles.subtitle}>
              Write down these words in the correct order and store them somewhere safe
            </Text>
          </View>

          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Important Security Warning</Text>
            <Text style={styles.warningText}>
              • Never share your recovery phrase with anyone{'\n'}
              • Store it securely offline{'\n'}
              • This phrase is the only way to recover your wallet
            </Text>
          </View>

          {renderMnemonicGrid(walletData.mnemonic)}

          <TouchableOpacity 
            style={styles.revealButton}
            onPress={() => setShowMnemonic(!showMnemonic)}
          >
            <Text style={styles.revealButtonText}>
              {showMnemonic ? 'Hide' : 'Reveal'} Secret Words
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.copyButton} onPress={copyMnemonic}>
            <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setStep(3)}
          >
            <Text style={styles.primaryButtonText}>I've Saved My Phrase</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Step 3: Confirm mnemonic phrase
  if (step === 3 && walletData) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Your Phrase</Text>
            <Text style={styles.subtitle}>
              Please enter your secret words in the correct order to confirm you've saved them
            </Text>
          </View>

          {renderMnemonicGrid(walletData.mnemonic, true)}

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={verifyConfirmation}
          >
            <Text style={styles.primaryButtonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setStep(2)}
          >
            <Text style={styles.secondaryButtonText}>Back to View Phrase</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Step 4: Success screen
  if (step === 4 && walletData) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.successContainer}>
            <Text style={styles.successIcon}>✅</Text>
            <Text style={styles.successTitle}>Wallet Ready!</Text>
            <Text style={styles.successSubtitle}>
              Your wallet has been successfully created and secured
            </Text>

            <View style={styles.walletInfo}>
              <Text style={styles.walletAddressLabel}>Your Wallet Address:</Text>
              <Text style={styles.walletAddress}>{walletData.address}</Text>
            </View>

            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => {
                // Navigate to main wallet screen
                onWalletCreated?.(walletData);
                // navigation.navigate('Wallet');
              }}
            >
              <Text style={styles.primaryButtonText}>Open Wallet</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Loading state
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0376FF" />
        <Text style={styles.loadingText}>
          {existingMnemonic ? 'Importing wallet...' : 'Creating wallet...'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionIconText: {
    fontSize: 18,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  mnemonicInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    marginBottom: 12,
  },
  importButton: {
    backgroundColor: color.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  importButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: color.primary,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  mnemonicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  mnemonicWordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  wordIndex: {
    fontSize: 12,
    color: '#999',
    width: 24,
  },
  wordButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  wordButtonRevealed: {
    backgroundColor: '#e7f3ff',
    borderColor: color.primary,
  },
  wordText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  wordTextRevealed: {
    fontSize: 14,
    color: color.primary,
    fontWeight: '500',
    textAlign: 'center',
  },
  wordInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  revealButton: {
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  revealButtonText: {
    color: color.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  copyButton: {
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  copyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: color.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  walletInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
  },
  walletAddressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  walletAddress: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
    fontFamily: 'monospace',
  },
});

export default WalletCreation;