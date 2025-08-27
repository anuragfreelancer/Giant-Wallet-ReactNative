import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import { fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

const tokens1 = [
  { id: "1", name: "GTAN", fullname: "Giant Token", price: "$ 63,910.82", change: "-1.4%", icon: imageIndex.giantToken },
  { id: "2", name: "BTC", fullname: "Bitcoin", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bitcoin},
  { id: "3", name: "MATIC", fullname: "Polygon", price: "$ 5,910.00", change: "-1.4%", icon: imageIndex.matic },
  { id: "4", name: "ETH", fullname: "Ethereum", price: "$ 23.00", change: "-1.4%", icon: imageIndex.etherum },
  { id: "5", name: "BNB", fullname: "BNB Smart Chain", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bnb },
];


const tokens = [
  {
    id: "1",
    symbol: "EVMOS",
    name: "Native Evmos",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/evmos-evmos-logo.png",
     icon: imageIndex.giantToken 
  },
  {
    id: "2",
    symbol: "STARS",
    name: "Stargaze",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/stargaze-stars-logo.png",
     icon: imageIndex.bitcoin 
  },
  {
    id: "3",
    symbol: "ETH",
    name: "Ethereum",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
     icon: imageIndex.matic 
  },
  {
    id: "4",
    symbol: "ATOM",
    name: "Cosmos",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
     icon: imageIndex.etherum 
  },
  {
    id: "5",
    symbol: "KAVA",
    name: "Kava",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/kava-kava-logo.png",
     icon: imageIndex.bnb 
  },
  {
    id: "6",
    symbol: "DOT",
    name: "Polkadot",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
     icon: imageIndex.bitcoin 
  },
  {
    id: "7",
    symbol: "LUNC",
    name: "Terra Classic",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/terra-luna-luna-logo.png",
     icon: imageIndex.giantToken 
  },
  {
    id: "8",
    symbol: "KSM",
    name: "Kusama",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/kusama-ksm-logo.png",
     icon: imageIndex.matic 
  },
  {
    id: "9",
    symbol: "INJ",
    name: "Native Injective",
    apr: "11.13%",
    logo: "https://cryptologos.cc/logos/injective-inj-logo.png",
     icon: imageIndex.etherum 
  },
];

export default function EarnList() {
  const navigation = useNavigation()
  const renderToken = ({ item }) => (
    <TouchableOpacity style={styles.tokenRow} onPress={()=>navigation.navigate(ScreenNameEnum.EarnDetail)}>
      <Image source={item.icon} style={styles.tokenIcon} />
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenName}>{item.symbol}</Text>
        <Text style={styles.tokenFullname}>{item.name}</Text>
      </View>
      <View style={styles.tokenPriceSection}>
        {/* <Text style={styles.tokenPrice}>{item.price}</Text> */}
        <Text style={styles.tokenChange}>Apr {item.apr}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
     
   
      <Text style={styles.sectionTitle}>EARN</Text>
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
  userName: { fontSize: 14, color: "#666" , fontFamily:fonts.regular,},
  welcome: { fontSize: 16, fontFamily:fonts.bold, color: "#000" },
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
  actionTitle: { fontSize: 16, fontFamily:fonts.bold, color: "#000" },
  actionSubtitle: { fontSize: 13, color: "#666", fontFamily:fonts.regular },

  sectionTitle: { fontSize: 18, fontFamily:fonts.bold, marginBottom: 16, textAlign:'center' },

  tokenRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    // borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingHorizontal:5
  },
  tokenIcon: { width: 35, height: 35, marginRight: 12 },
  tokenInfo: { flex: 1 },
  tokenName: { fontSize: 15,  color: "#000", fontFamily:fonts.bold },
  tokenFullname: { fontSize: 13, color: "#666", fontFamily:fonts.regular },
  tokenPriceSection: { alignItems: "flex-end" },
  tokenPrice: { fontSize: 15, fontFamily:fonts.bold, color: "#000" },
  tokenChange: { fontSize: 13, color: "red", fontFamily:fonts.regular },
});
