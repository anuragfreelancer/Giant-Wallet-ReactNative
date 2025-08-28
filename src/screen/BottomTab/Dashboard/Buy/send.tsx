import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../../../assets/imageIndex";
import ScreenNameEnum from "../../../../routes/screenName.enum";
import { fonts } from "../../../../constant";
import CustomHeader from "../../../../compoent/CustomHeader";

const tokens = [
  { id: "1", name: "GTAN", fullname: "Giant Token", price: "$ 63,910.82", change: "-1.4%", icon: imageIndex.giantToken },
  { id: "2", name: "BTC", fullname: "Bitcoin", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bitcoin },
  { id: "3", name: "MATIC", fullname: "Polygon", price: "$ 5,910.00", change: "-1.4%", icon: imageIndex.matic },
  { id: "4", name: "ETH", fullname: "Ethereum", price: "$ 23.00", change: "-1.4%", icon: imageIndex.etherum },
  { id: "5", name: "BNB", fullname: "BNB Smart Chain", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bnb },
];

export default function SendScreen() {
  const navigation = useNavigation()
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
   <CustomHeader
        menuIcon={imageIndex.back}
        label="Send"
        navigation={navigation}
        leftPress={true}
      />

      {/* Wallet Actions */}
   
        <View style={{ padding: 20, }}>


          <Text style={[styles.tokenFullname, {textAlign:'center'}]}>Current Balance</Text>
         <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}} onPress={()=>navigation.navigate(ScreenNameEnum.SendEth)}>
          <Text style={[styles.tokenName, { fontSize: 26 , textAlign:'center'}]}>$ 100.00</Text>
          <Image source={imageIndex.eye} style ={{height:25, width:25, marginLeft:5, tintColor:'#9E9E9E'}}/>
</TouchableOpacity>
       
    

      
      {/* Popular Tokens */}
      <Text style={styles.sectionTitle}>Popular tokens</Text>
      <FlatList
        data={tokens}
        renderItem={renderToken}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
    marginHorizontal:15

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
