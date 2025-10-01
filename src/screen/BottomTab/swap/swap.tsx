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