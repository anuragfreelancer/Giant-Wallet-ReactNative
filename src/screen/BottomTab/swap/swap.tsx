// // SwapScreen.tsx
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Image } from "react-native";
// import TokenInputCard from "./tokenInputCard";
// import imageIndex from "../../../assets/imageIndex";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Text } from "react-native";
// import { fonts } from "../../../constant";
// import CustomButton from "../../../compoent/CustomButton";
// import TokenSelectModal from "./tokenSelectModal.tsx";

// export default function SwapScreen() {
//   const [fromAmount, setFromAmount] = useState("");
//   const [toAmount, setToAmount] = useState("");
//  const [modalVisible, setModalVisible] = useState(false);
//   const [btcPrice, setBtcPrice] = useState(0);
//   const [ethPrice, setEthPrice] = useState(0);
//   const [btcAmount, setBtcAmount] = useState("1");
//   const [ethValue, setEthValue] = useState("0");

//   const fetchPrices = async () => {
//     try {
//       const res = await fetch(
//         "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
//       );
//       const data = await res.json();
//       setBtcPrice(data.bitcoin.usd);
//       setEthPrice(data.ethereum.usd);
//     } catch (err) {
//       console.log("Error fetching prices:", err);
//     }
//   };

//   // Calculate ETH value from BTC input
//   useEffect(() => {
//     fetchPrices();
//   }, []);

//   useEffect(() => {
//     if (btcPrice && ethPrice && btcAmount) {
//       const usdValue = parseFloat(btcAmount) * btcPrice;
//       const ethEquivalent = usdValue / ethPrice;
//       setEthValue(ethEquivalent.toFixed(6));
//     }
//   }, [btcAmount, btcPrice, ethPrice]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>SWAP</Text>
//       <TokenInputCard
//         label="From"
//         token="ETH"
//         amount={btcAmount}
//         usdValue="$0"
//         onChangeAmount={setBtcAmount}
//         onSelectToken={() => console.log("Select From Token")}
//         //  value={btcAmount}
//         // onChangeText={setBtcAmount}
//       />

//       <Image source={imageIndex.change} style={{height:40, width:40, alignSelf:'center', marginVertical:40}}/>
//   <Text style={styles.result}>
//         {btcAmount} BTC ≈ {ethValue} ETH
//       </Text>
//       <TokenInputCard
//         label="To"
//         token="ETH"
//         amount={toAmount}
//         usdValue="$0"
//         onChangeAmount={setToAmount}
//         onSelectToken={() => console.log("Select To Token")}
//       />
//       <CustomButton title="Swap" style={{marginTop:50}} onPress={()=>setModalVisible(true)}/>

//           <TokenSelectModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onSelect={(token) => {
//           console.log("Selected Token:", token);
//           setModalVisible(false);
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   title:{
//     fontSize:30,
//     fontFamily:fonts.bold,
//     textAlign:'center'
//   }
// });







// ==================================================
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../../constant";
import CustomButton from "../../../compoent/CustomButton";
import { data } from "./data";
import TokenInputCard from "./tokenInputCard";
import imageIndex from "../../../assets/imageIndex";
import TokenSelectModal from "./tokenSelectModal.tsx";

// Mock token data - in a real app, this would come from an API
const tokenData = data

const TokenInputCard1 = ({
  label,
  token,
  amount,
  usdValue,
  onChangeAmount,
  onSelectToken
}:any) => (
  <View style={styles.tokenCard}>
    <Text style={styles.cardLabel}>{label}</Text>
    <View style={styles.cardContent}>
      <TouchableOpacity style={styles.tokenSelector} onPress={onSelectToken}>
        <Image
          source={{ uri: tokenData.find(t => t.symbol === token)?.image || tokenData[0].image }}
          style={styles.tokenIcon}
        />
        <Text style={styles.tokenSymbol}>{token}</Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>
      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={onChangeAmount}
          placeholder="0.0"
          keyboardType="decimal-pad"
        />
        <Text style={styles.usdValue}>{usdValue}</Text>
      </View>
    </View>
  </View>
);

const TokenSelectModal1 = ({ visible, onClose, onSelect, currentToken }:any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokenData.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Token</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Search tokens"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={filteredTokens}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tokenItem,
                  currentToken === item.symbol && styles.selectedToken
                ]}
                onPress={() => onSelect(item)}
              >
                <Image source={{ uri: item.image }} style={styles.tokenItemIcon} />
                <View style={styles.tokenInfo}>
                  <Text style={styles.tokenName}>{item.name}</Text>
                  <Text style={styles.tokenSymbol}>{item.symbol}</Text>
                </View>
                <View style={styles.tokenPriceInfo}>
                  <Text style={styles.tokenPrice}>${item.current_price.toLocaleString()}</Text>
                  <Text style={[
                    styles.tokenChange,
                    { color: item.price_change_percentage_24h >= 0 ? '#4cd964' : '#ff3b30' }
                  ]}>
                    {parseFloat(item?.price_change_percentage_24h).toFixed(2)}%
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default function SwapScreen() {
  const [fromToken, setFromToken] = useState(data[0]?.symbol);
  const [toToken, setToToken] = useState(data[1]?.symbol);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const [fromIcon, setFromIcon] = useState(data[0]?.image);
  const [toIcon, setToIcon] = useState(data[1]?.image);
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);
  const [rate, setRate] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);
  const [estimatedFee, setEstimatedFee] = useState(0);

  // Calculate conversion when fromAmount or tokens change
  useEffect(() => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const fromTokenData = tokenData.find(t => t.symbol === fromToken);
      const toTokenData = tokenData.find(t => t.symbol === toToken);

      if (fromTokenData && toTokenData) {
        const conversionRate = fromTokenData.current_price / toTokenData.current_price;
        const convertedAmount = parseFloat(fromAmount) * conversionRate;
        const usdValue = parseFloat(fromAmount) * fromTokenData.current_price;
        const fee = usdValue * 0.005; // 0.5% fee

        setRate(conversionRate);
        setToAmount(convertedAmount.toFixed(6) );
        setUsdPrice(usdValue);
        setEstimatedFee(fee);
      }
    } else {
      setToAmount("");
      setRate(0);
      setUsdPrice(0);
      setEstimatedFee(0);
    }
  }, [fromAmount, fromToken, toToken]);

  const handleTokenSelect = (tokenSymbol:any, isFromToken: boolean) => {
    console.log(tokenSymbol)
    if (isFromToken) {
      setFromToken(tokenSymbol.symbol);
      setFromIcon(tokenSymbol?.image)
      setFromModalVisible(false);
    } else {
      setToToken(tokenSymbol.symbol);
      setToIcon(tokenSymbol?.image)
      setToModalVisible(false);
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setToIcon(fromIcon)
    setFromIcon(toIcon)
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>SWAP</Text>
      <TokenInputCard
        label="From"
        token={fromToken}
        amount={fromAmount}
        usdValue="$0"
        onChangeAmount={setFromAmount}
        onSelectToken={() => setFromModalVisible(true)}
        image={fromIcon}

      />

      <TouchableOpacity onPress={handleSwapTokens}>
        <Image source={imageIndex.change} style={{ height: 40, width: 40, alignSelf: 'center', marginVertical: 40 }} />

      </TouchableOpacity>

      <TokenInputCard
        label="To"
        token={toToken}
        amount={toAmount}
        usdValue={`$${(usdPrice - estimatedFee).toFixed(2)}`}
        onChangeAmount={setToAmount}
        onSelectToken={() => setToModalVisible(true)}
        image={toIcon}
      />

      {/* {fromAmount && (
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rate</Text>
            <Text style={styles.detailValue}>
              1 {fromToken} = {rate.toFixed(6)} {toToken}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Inverse Rate</Text>
            <Text style={styles.detailValue}>
              1 {toToken} = {(1 / rate).toFixed(6)} {fromToken}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>USD Price</Text>
            <Text style={styles.detailValue}>${usdPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Fee</Text>
            <Text style={styles.detailValue}>${estimatedFee.toFixed(2)}</Text>
          </View>
        </View>
      )} */}

      <CustomButton
        title="Confirm Swap"
        style={styles.confirmButton}
        onPress={() => console.log("Swap confirmed")}
        disabled={!fromAmount || parseFloat(fromAmount) <= 0}
      />

           {/* <TokenSelectModal
        visible={fromModalVisible}
        onClose={() => setFromModalVisible(false)}
        onSelect={(token) => handleTokenSelect(token, true)}
      /> */}
      <TokenSelectModal
        visible={fromModalVisible}
        onClose={() => setFromModalVisible(false)}
        onSelect={(token) => handleTokenSelect(token, true)}
        currentToken={fromToken}
      />

      <TokenSelectModal
        visible={toModalVisible}
        onClose={() => setToModalVisible(false)}
        onSelect={(token) => handleTokenSelect(token, false)}
        currentToken={toToken}
      />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  tokenCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 100,
  },
  tokenIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  tokenItemIcon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6c757d',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountInput: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    minWidth: 100,
  },
  usdValue: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  swapButton: {
    alignSelf: 'center',
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  swapIcon: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  confirmButton: {
    marginTop: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#6c757d',
  },
  searchInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedToken: {
    backgroundColor: '#e8f4ff',
  },
  tokenInfo: {
    flex: 1,
    marginLeft: 8,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '500',
  },
  tokenPriceInfo: {
    alignItems: 'flex-end',
  },
  tokenPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  tokenChange: {
    fontSize: 12,
    marginTop: 2,
  },
});
// ====================================================

// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { fetchQuote, swapFromEvm, Quote } from '@mayanfinance/swap-sdk';
// import { useWalletConnectModal } from '@walletconnect/modal-react-native';
// import { ethers } from 'ethers';
// import axios from 'axios';

// const SwapScreen = () => {
//   const [fromAmount, setFromAmount] = useState('');
//   const [toAmount, setToAmount] = useState('');
//   const [fromToken, setFromToken] = useState({ symbol: 'ETH', name: 'Ethereum', balance: 1.5 });
//   const [toToken, setToToken] = useState({ symbol: 'USDC', name: 'USD Coin', balance: 0 });
//   const [isSwapping, setIsSwapping] = useState(false);
//   const [exchangeRate, setExchangeRate] = useState(3500); // 1 ETH = 3500 USDC
// const { provider, open, isConnected, address } = useWalletConnectModal();

//   const getSwapQuote = async (sellToken, buyToken, sellAmountHuman, sellTokenDecimals) => {
//     // 1. Convert human-readable amount (e.g., 1.0) to the token's smallest unit (e.g., 1000000)
//     const amountInSmallestUnit = ethers.utils.parseUnits(
//       sellAmountHuman.toString(), // e.g., "1"
//       sellTokenDecimals          // e.g., 6 for USDC/USDT
//     ).toString();

//     const quoteArgs = {
//       amount: amountInSmallestUnit, // <-- This is the corrected amount
//       fromToken: sellToken,
//       toToken: buyToken,
//       fromChain: 'arbitrum',
//       toChain: 'polygon',
//       slippageBps: 300,
//     };

//     try {
//       console.log(quoteArgs)
//       // const quotes = await fetchQuote(quoteArgs);
//       // const quotes = await fetchQuote({
//       //   amountIn64: "250000000", // if fromToken is USDC means 250 USDC
//       //   fromToken: '0xFd086bC7cd5C481Dcc9C851cE204CDbE48198533',
//       //   toToken: '0xc2132D05d31c914a87C6611c10748AEb04B58e8F',
//       //   fromChain: "avalanche",
//       //   toChain: "solana",
//       //   slippageBps: "auto",
//       //   gasDrop: 0.04, // optional
//       //   // referrer: "YOUR SOLANA WALLET ADDRESS", // optional
//       //   referrerBps: 5, // optional
//       // });

//       // console.log(quotes)
//       // ... (rest of your logic)


//       await performMayanSwap(provider, {
//   amountIn64: "1500000",
//   fromChain: "avalanche",
//   toChain: "solana",
//   fromToken: "0xFd086bC7cd5C481Dcc9C851cE204CDbE48198533", // USDT on Avalanche
//   toToken: "So11111111111111111111111111111111111111112", // SOL (on Solana)
//   slippageBps: 100,
//   gasDrop: 0.04,
//   referrerBps: 5,
// });
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//       return null;
//     }
//   };

//   // Mock exchange rate - in real app, fetch from API



//  const performMayanSwap = async (provider, params) => {
//   const {
//     amountIn64,
//     fromToken,
//     toToken,
//     fromChain,
//     toChain,
//     slippageBps,
//     gasDrop,
//     referrerBps,
//   } = params;

//   try {
//     // 🔹 Connect signer
//     const ethersProvider = new ethers.BrowserProvider(provider);
//     const signer = await ethersProvider.getSigner();
//     const walletAddress = await signer.getAddress();

//     // 🔹 Fetch swap quote from Mayan
//     const { data: quote } = await axios.get(
//       "https://api.mayan.finance/v2/quote",
//       {
//         params: {
//           fromChain,
//           toChain,
//           fromToken,
//           toToken,
//           amount: amountIn64, // ✅ Use amount, not amountIn64
//           slippageBps: 100,   // 1% slippage
//           gasDrop: gasDrop ?? 0.04,
//           referrerBps: referrerBps ?? 5,
//           user: walletAddress,
//         },
//       }
//     );

//     console.log("✅ Quote received:", quote);

//     if (!quote.tx) throw new Error("Quote does not contain transaction data");

//     // 🔹 Execute swap transaction
//     const txResponse = await signer.sendTransaction({
//       to: quote.tx.to,
//       data: quote.tx.data,
//       value: quote.tx.value ? BigInt(quote.tx.value) : 0n,
//       gasLimit: quote.tx.gasLimit ? BigInt(quote.tx.gasLimit) : undefined,
//     });

//     console.log("🚀 Swap transaction submitted:", txResponse.hash);

//     await txResponse.wait();
//     console.log("✅ Swap completed!");
//   } catch (error) {
//     console.error(
//       "❌ Swap failed:",
//       error.response?.data || error.message || error
//     );
//   }
// };
//   useEffect(() => {
//     calculateToAmount();

//   }, [fromAmount, exchangeRate]);
//   useEffect(() => {
//     const ARB_USDT = "0xFd086bC7cd5C481Dcc9C851cE204CDbE48198533"; // Example: ARB USDT
//     const POLYGON_USDT = "0xc2132D05d31c914a87C6611c10748AEb04B58e8F"; // Example: Polygon USDT
//     getSwapQuote(ARB_USDT, POLYGON_USDT, 1.0, 6);
//   }, [])

//   const calculateToAmount = () => {
//     if (fromAmount && !isNaN(fromAmount)) {
//       const result = parseFloat(fromAmount) * exchangeRate;
//       setToAmount(result.toFixed(2));
//     } else {
//       setToAmount('');
//     }
//   };

//   const handleSwapTokens = () => {
//     // Swap from and to tokens
//     const temp = fromToken;
//     setFromToken(toToken);
//     setToToken(temp);
//     setFromAmount(toAmount);
//   };

// const handleSwap = async () => {
//   try {
//     if (!fromAmount || parseFloat(fromAmount) <= 0) {
//       Alert.alert("Error", "Please enter a valid amount");
//       return;
//     }

//     if (!isConnected) {
//       console.log('first')
//       await open(); // open WalletConnect modal
//       return;
//     }

//     setIsSwapping(true);

//     // Step 1: Convert amount to smallest units
//     const amountInSmallestUnit = ethers.parseUnits(
//       fromAmount.toString(),
//       6 // USDC decimals
//     ).toString();

//     // Step 2: Prepare quote parameters
//     const quoteArgs = {
//       amountIn64: amountInSmallestUnit,
//       fromToken: "0xFd086bC7cd5C481Dcc9C851cE204CDbE48198533", // ARB USDT
//       toToken: "0xc2132D05d31c914a87C6611c10748AEb04B58e8F",   // Polygon USDT
//       fromChain: "avalanche",
//       toChain: "solana",
//       slippageBps: "auto",
//       gasDrop: 0.04,
//       referrerBps: 5,
//     };

//     console.log("Fetching Mayan quote...", quoteArgs);
//     const quote = await fetchQuote(quoteArgs);

//     if (!quote || !quote.tx) {
//       Alert.alert("Error", "Failed to fetch quote");
//       setIsSwapping(false);
//       return;
//     }

//     console.log("Quote fetched:", quote);

//     // Step 3: Create signer from WalletConnect provider
//     const ethersProvider = new ethers.BrowserProvider(provider);
//     const signer = await ethersProvider.getSigner();

//     // Step 4: Execute swap transaction on EVM
//     console.log("Executing swapFromEvm...");
//     const txResponse = await swapFromEvm(signer, quote.tx);
//     console.log("Tx sent:", txResponse);

//     Alert.alert(
//       "Swap Confirmed 🚀",
//       `Transaction hash:\n${txResponse.hash}`,
//       [{ text: "OK" }]
//     );

//     // Step 5: Reset form
//     setFromAmount("");
//     setToAmount("");
//   } catch (error) {
//     console.error("Swap failed:", error);
//     Alert.alert("Swap Failed ❌", error.message || "Please try again");
//   } finally {
//     setIsSwapping(false);
//   }
// };
//   const TokenSelector = ({ token, onPress, type }) => (
//     <TouchableOpacity style={styles.tokenSelector} onPress={onPress}>
//       <View style={styles.tokenInfo}>
//         <View style={styles.tokenIcon}>
//           <Text style={styles.tokenSymbol}>{token.symbol}</Text>
//         </View>
//         <View>
//           <Text style={styles.tokenSymbolText}>{token.symbol}</Text>
//           <Text style={styles.tokenName}>{token.name}</Text>
//         </View>
//       </View>
//       <Icon name="keyboard-arrow-down" size={24} color="#666" />
//     </TouchableOpacity>
//   );

//   const AmountInput = ({ value, onChangeText, token, type, editable = true }) => (
//     <View style={styles.amountContainer}>
//       <TextInput
//         style={[styles.amountInput, !editable && styles.amountInputDisabled]}
//         value={value}
//         onChangeText={onChangeText}
//         placeholder="0"
//         keyboardType="decimal-pad"
//         editable={editable}
//         placeholderTextColor="#999"
//       />
//       <Text style={styles.balanceText}>
//         Balance: {token.balance} {token.symbol}
//       </Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Swap</Text>
//           </View>

//           {/* From Section */}
//           <View style={styles.swapSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionLabel}>From</Text>
//               <TouchableOpacity onPress={() => setFromAmount(fromToken.balance.toString())}>
//                 <Text style={styles.maxButton}>MAX</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputRow}>
//               <AmountInput
//                 value={fromAmount}
//                 onChangeText={setFromAmount}
//                 token={fromToken}
//                 type="from"
//                 editable={true}
//               />
//               <TokenSelector
//                 token={fromToken}
//                 onPress={() => Alert.alert('Select Token', 'Token selection would open here')}
//               />
//             </View>

//             <Text style={styles.usdValue}>
//               ~${(parseFloat(fromAmount || 0) * 3500).toLocaleString()}
//             </Text>
//           </View>

//           {/* Swap Button */}
//           <TouchableOpacity style={styles.swapButton} onPress={handleSwapTokens}>
//             <Icon name="swap-vert" size={24} color="#fff" />
//           </TouchableOpacity>

//           {/* To Section */}
//           <View style={styles.swapSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionLabel}>To</Text>
//             </View>

//             <View style={styles.inputRow}>
//               <AmountInput
//                 value={toAmount}
//                 onChangeText={setToAmount}
//                 token={toToken}
//                 type="to"
//                 editable={false}
//               />
//               <TokenSelector
//                 token={toToken}
//                 onPress={() => Alert.alert('Select Token', 'Token selection would open here')}
//               />
//             </View>

//             <Text style={styles.usdValue}>
//               ~${toAmount || '0'}
//             </Text>
//           </View>

//           {/* Exchange Rate */}
//           <View style={styles.rateInfo}>
//             <Text style={styles.rateText}>
//               1 {fromToken.symbol} = {exchangeRate} {toToken.symbol}
//             </Text>
//             <Icon name="info-outline" size={16} color="#666" />
//           </View>

//           {/* Swap Button */}
//           <TouchableOpacity
//             style={[
//               styles.confirmButton,
//               (!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping) && styles.confirmButtonDisabled
//             ]}
//             onPress={handleSwap}
//             disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isSwapping}
//           >
//             {isSwapping ? (
//               <Text style={styles.confirmButtonText}>Swapping...</Text>
//             ) : (
//               <Text style={styles.confirmButtonText}>
//                 {!fromAmount || parseFloat(fromAmount) <= 0 ? 'Enter Amount' : 'Swap'}
//               </Text>
//             )}
//           </TouchableOpacity>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   swapSection: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     color: '#666',
//     fontWeight: '500',
//   },
//   maxButton: {
//     color: '#007AFF',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   amountContainer: {
//     flex: 1,
//   },
//   amountInput: {
//     fontSize: 28,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 4,
//   },
//   amountInputDisabled: {
//     color: '#666',
//   },
//   balanceText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   tokenSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 12,
//     minWidth: 120,
//   },
//   tokenInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   tokenIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 8,
//   },
//   tokenSymbol: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   tokenSymbolText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   tokenName: {
//     fontSize: 12,
//     color: '#666',
//   },
//   usdValue: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 8,
//   },
//   swapButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginVertical: -10,
//     zIndex: 1,
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   rateInfo: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   rateText: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 6,
//   },
//   confirmButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   confirmButtonDisabled: {
//     backgroundColor: '#ccc',
//     shadowOpacity: 0,
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default SwapScreen;


