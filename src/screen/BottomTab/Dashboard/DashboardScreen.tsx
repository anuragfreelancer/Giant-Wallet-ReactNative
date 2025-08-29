import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import { fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { ethers } from "ethers";


const tokens = [
  { id: "1", name: "GTAN", fullname: "Giant Token", price: "$ 63,910.82", change: "-1.4%", icon: imageIndex.giantToken },
  { id: "2", name: "BTC", fullname: "Bitcoin", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bitcoin },
  { id: "3", name: "MATIC", fullname: "Polygon", price: "$ 5,910.00", change: "-1.4%", icon: imageIndex.matic },
  { id: "4", name: "ETH", fullname: "Ethereum", price: "$ 23.00", change: "-1.4%", icon: imageIndex.etherum },
  { id: "5", name: "BNB", fullname: "BNB Smart Chain", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bnb },
];

export default function WalletHome() {
  const navigation = useNavigation()
  const [connected, setConnected] = useState(false)

  // Generate a new random wallet
  const createWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    console.log("Address:", wallet.address);
    console.log("Private Key:", wallet.privateKey);
    console.log("Mnemonic:", wallet.mnemonic?.phrase);
    return wallet;
  };
  const renderToken = ({ item }) => (
    <View style={styles.tokenRow}>
      <Image source={item.icon} style={styles.tokenIcon} />
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenName}>{item.name}</Text>
        <Text style={styles.tokenFullname}>{item.fullname}</Text>
      </View>
      <View style={styles.tokenPriceSection}>
        <Text style={styles.tokenPrice}>{item.price}</Text>
        <Text style={styles.tokenChange}>{item.change}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={imageIndex.dummy} style={styles.profileImage} />
          <View>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.userName}>Ashlynn Korsgaard</Text>
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
      {connected ?
        <View>
          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(ScreenNameEnum.CreatePin)}>
            <Image source={imageIndex.add} style={styles.actionIcon} />
            <View>
              <Text style={styles.actionTitle}>Create new wallet</Text>
              <Text style={styles.actionSubtitle}>Secret phrase or Swift wallet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate(ScreenNameEnum.BuyScreen)}>
            <Image source={imageIndex.download} style={styles.actionIcon} />
            <View>
              <Text style={styles.actionTitle}>Add existing wallet</Text>
              <Text style={styles.actionSubtitle}>Import, restore or view-only</Text>
            </View>
          </TouchableOpacity>
        </View>
        :
        <View style={{ padding: 20, alignItems: 'center' }}>


          <Text style={styles.tokenFullname}>Current Balance</Text>
          <Text onPress={() => setConnected(true)} style={[styles.tokenName, { fontSize: 26 }]}>$ 1500.00</Text>

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
      <Text style={styles.sectionTitle}>Popular tokens</Text>
      <FlatList
        data={tokens}
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
  tokenIcon: { width: 35, height: 35, marginRight: 12 },
  tokenInfo: { flex: 1 },
  tokenName: { fontSize: 15, color: "#000", fontFamily: fonts.bold },
  tokenFullname: { fontSize: 13, color: "#666", fontFamily: fonts.regular },
  tokenPriceSection: { alignItems: "flex-end" },
  tokenPrice: { fontSize: 15, fontFamily: fonts.bold, color: "#000" },
  tokenChange: { fontSize: 13, color: "red", fontFamily: fonts.regular },
});
