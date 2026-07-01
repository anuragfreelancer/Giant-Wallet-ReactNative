import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import { fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { ethers } from "ethers";
import Clipboard from "@react-native-clipboard/clipboard";
import { Fetch_CointAPI } from "../../../Api/apiRequest";
import LoadingModal from "../../../utils/Loader";
import { useSelector } from "react-redux";
import TooltipMenu from "../../../compoent/CustomTooltip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletCreation from "./walletCreation";

const PROVIDER_URL = "https://sepolia.infura.io/v3/0556c560569a46a283d23c736af1a7c4";
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

export default function WalletHome() {
  const navigation = useNavigation()
  const [showWalletCreation, setShowWalletCreation] = useState(false);
  const [connected, setConnected] = useState(false)
  const [existingMnemonic, setExistingMnemonic] = useState<string>();
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState()
  const [balance, setBalance] = useState(0)
  const isLogin = useSelector((state: any) => state?.auth);
  console.log(isLogin)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    // AsyncStorage.removeItem('wallet')
    const data = await Fetch_CointAPI(setLoading)
    const ww = await AsyncStorage.getItem('wallet')
    const nn = await ww != null ? JSON.parse(ww) : null;
    console.log(nn)
    setWallet(nn)

    if (nn) {
      setConnected(true)
      const bb = await getWalletBalance()
      console.log(bb)
    }
    setCoins(data)
  };
  // Generate a new random wallet
  // useEffect(() => {
  //   (async () => {

  //     const wallet = ethers.Wallet.createRandom();
  //     console.log("Address:", wallet.address);

  //     const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
  //     const signer = wallet.connect(provider);
  //     const route = await swapKit.getQuote({
  //       fromToken: {
  //         chainId: 56,
  //         address: "0x55d398326f99059fF775485246999027B3197955", // USDT
  //         decimals: 18,
  //       },
  //       toToken: {
  //         chainId: 56,
  //         address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82", // CAKE
  //         decimals: 18,
  //       },
  //       amount: "1000000000000000000", // 1 USDT in wei
  //     });
  //     const tx = await swapKit.executeSwap({
  //       route,
  //       signer,
  //     });

  //   })()
  // }, [])


  const createWallet = async () => {
    setLoading(true); // show loader first

    // Give React a tick to render the loader
    setTimeout(async () => {
      try {
        const wallet = ethers.Wallet.createRandom();
        console.log("Address:", wallet.address);
        console.log("Private Key:", wallet.privateKey);
        console.log("Mnemonic:", wallet.mnemonic?.phrase);

        setConnected(true);

        const jsonValue = JSON.stringify({
          address: wallet.address,
          privateKey: wallet.privateKey,
          mnemonic: wallet.mnemonic?.phrase,
        });
        setWallet(wallet)
        await AsyncStorage.setItem("wallet", jsonValue);

        Alert.alert(
          "Wallet Created",
          `Address: ${wallet.address}\n\nMnemonic: ${wallet.mnemonic?.phrase}`,
          [
            {
              text: "Copy Mnemonic",
              onPress: () => {
                Clipboard.setString(wallet.mnemonic?.phrase || "");
                Alert.alert("Copied", "Mnemonic copied to clipboard!");
              },
            },
            { text: "OK" },
          ]
        );
      } catch (err) {
        console.error("Wallet creation failed:", err);
        Alert.alert("Error", "Failed to create wallet");
      } finally {
        setLoading(false); // stop loader
      }
    }, 100); // 100ms delay gives UI time to update
  };



  const getWalletBalance = async () => {
    try {
      // Load saved wallet
      const walletData = await AsyncStorage.getItem("wallet");
      if (!walletData) {
        Alert.alert("Error", "No wallet found. Please create one first.");
        return null;
      }

      // Parse and reconstruct wallet
      const parsed = JSON.parse(walletData);
      const wallet = new ethers.Wallet(parsed.privateKey, provider);
      console.log(parsed)
      // Get balance
      const balanceWei = await provider.getBalance(wallet.address);
      const balanceEth = ethers.formatEther(balanceWei); // converts wei → ETH/BNB
      setBalance(balanceEth)
      console.log(`Balance of ${wallet.address}: ${balanceEth}`);
      // Alert.alert("Wallet Balance", `${balanceEth} tBNB (testnet)`);

      return balanceEth;
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to fetch wallet balance");
      return null;
    }
  };

  if (showWalletCreation) {
    return (
      <WalletCreation
        existingMnemonic={existingMnemonic}
        onWalletCreated={async (walletData) => {
          // Handle successful wallet creation
          await setWallet(walletData)
          const jsonValue = JSON.stringify({
            address: walletData.address,
            privateKey: walletData.privateKey,
            mnemonic: walletData.mnemonic?.phrase,
          });
          await AsyncStorage.setItem("wallet", jsonValue);
          setConnected(true)
          setShowWalletCreation(false);
          console.log(walletData)

          await getWalletBalance()


        }}
        onBack={() => setShowWalletCreation(false)}
      />
    );
  }


  const renderToken = ({ item }: any) => (
    <TouchableOpacity style={styles.tokenRow} onPress={() => navigation.navigate(ScreenNameEnum.cointDetail, { id: item?.id })}>
      <Image source={{ uri: item.image.thumb || item.image }} style={styles.tokenIcon} />
      <View style={styles.tokenInfo}>
        {/* <Text style={styles.tokenName}>{item.name}</Text> */}
        <Text style={styles.tokenName}>{item?.symbol}</Text>
        <Text style={styles.tokenFullname}>{item.name}</Text>
      </View>
      <View style={styles.tokenPriceSection}>
        <Text style={styles.tokenPrice}>${parseFloat(item.current_price)}</Text>
        <Text style={[styles.tokenChange, { color: item.price_change_percentage_24h >= 0 ? "green" : "red" },]}>{parseFloat(item.price_change_percentage_24h).toFixed(2)}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: isLogin?.userData?.avatar }} style={styles.profileImage} />
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.userName}>{isLogin?.userData?.fullName}</Text>
          </View>
        </View>
        <View style={styles.iconsRow}>
          <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.DonationScreen)}>
            <Image source={imageIndex.donation} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Notification)}>

            <Image source={imageIndex.notification} style={styles.icon} />
          </TouchableOpacity>
          {/* <Image source={require("./assets/settings.png")} style={styles.icon} /> */}
        </View>
      </View>

      {/* Wallet Actions */}
      {connected == false ?
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <TouchableOpacity style={styles.actionCard}
            onPress={() => {

              // createWallet()
              setShowWalletCreation(true);
            }}>
            <Image source={imageIndex.add} style={styles.actionIcon} />
            <View>
              <Text style={styles.actionTitle}>Create new wallet</Text>
              <Text style={styles.actionSubtitle}>Secret phrase or Swift wallet</Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(ScreenNameEnum.importWallet)}>
            <Image source={imageIndex.download} style={styles.actionIcon} />
            <View>
              <Text style={styles.actionTitle}>Add existing wallet</Text>
              <Text style={styles.actionSubtitle}>Import, restore or view-only</Text>
            </View>
          </TouchableOpacity> */}
        </View>
        :
        <View style={{ padding: 20, alignItems: 'center' }}>


          <Text style={styles.tokenFullname}>Current Balance</Text>
          <Text onPress={() => setConnected(false)} style={[styles.tokenName, { fontSize: 26 }]}>$ {balance}</Text>
          {/* <Text style={[styles.tokenFullname, { width: '70%' }]} numberOfLines={1}>Wallet address: {wallet?.address}</Text> */}
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 0, width: "85%" }}>
            <Text style={[styles.tokenFullname, { flex: 1 }]} numberOfLines={1}>
              Wallet address: {wallet?.address}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (wallet?.address) {
                  Clipboard.setString(wallet.address);
                  Alert.alert("Copied!", "Wallet address copied to clipboard.");
                }
              }}
              style={styles.copyButton}
            >
              <Text style={{ fontSize: 18 }}>📋</Text>
              {/* Or use vector-icons: <Ionicons name="copy-outline" size={20} color="black" /> */}
            </TouchableOpacity>
          </View>
          <View style={[styles.iconsRow, { justifyContent: 'space-between', width: '100%', marginTop: 15 }]}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(ScreenNameEnum.SendScreen)}>
              <Image source={imageIndex.send} style={[styles.icon, { marginLeft: 0 }]} />
              <Text style={[styles.actionSubtitle1]}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(ScreenNameEnum.BuyScreen)}>
              <Image source={imageIndex.download} style={[styles.icon, { marginLeft: 0 }]} />
              <Text style={[styles.actionSubtitle1]}>Recieve</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(ScreenNameEnum.BuyScreen)}> */}
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => createWallet()}>
              <Image source={imageIndex.imports} style={[styles.icon, { marginLeft: 0 }]} />
              <Text style={[styles.actionSubtitle1]}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate(ScreenNameEnum.SellScreen)}>

              <Image source={imageIndex.export} style={[styles.icon, { marginLeft: 0 }]} />
              <Text style={[styles.actionSubtitle1]}>Sell</Text>
            </TouchableOpacity>
          </View>
        </View>

      }
      {/* Popular Tokens */}
      <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text style={styles.sectionTitle}>Popular tokens</Text>
        <TooltipMenu />
      </View>
      <FlatList
        data={coins}
        renderItem={renderToken}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  userName: { fontSize: 14, color: "#666", fontFamily: fonts.regular, },
  welcome: { fontSize: 16, fontFamily: fonts.bold, color: "#000" },
  iconsRow: { flexDirection: "row" },
  icon: { width: 40, height: 40, marginLeft: 12 },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F6",
    padding: 14,
    borderRadius: 16,
    marginTop: 14,

  },
  actionIcon: { width: 40, height: 40, marginRight: 12 },
  actionTitle: { fontSize: 16, fontFamily: fonts.bold, color: "#000" },
  actionSubtitle: { fontSize: 13, color: "#666", fontFamily: fonts.regular },
  actionSubtitle1: { fontSize: 14, color: "#666", fontFamily: fonts.semiBold, textAlign: 'center', marginTop: 3 },

  sectionTitle: { fontSize: 18, fontFamily: fonts.bold, marginVertical: 16, color: '#9E9E9E' },

  tokenRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    // borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal: 5
  },
  tokenIcon: { width: 36, height: 36, marginRight: 12, borderRadius: 0, },
  tokenInfo: { flex: 1 },
  tokenName: { fontSize: 15, color: "#000", fontFamily: fonts.bold },
  tokenFullname: { fontSize: 13, color: "#666", fontFamily: fonts.regular },
  tokenPriceSection: { alignItems: "flex-end" },
  tokenPrice: { fontSize: 15, fontFamily: fonts.bold, color: "#000" },
  tokenChange: { fontSize: 13, color: "red", fontFamily: fonts.regular },

  copyButton: {
    marginLeft: 8,
    padding: 0,
    borderRadius: 6,
    // backgroundColor: "#f2f2f2",
  },

});
