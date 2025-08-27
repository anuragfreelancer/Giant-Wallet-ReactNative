// TokenInputCard.tsx
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { fonts } from "../../../constant";


interface Props {
  label: string;
  token: string;
  amount: string;
  usdValue: string;
  onChangeAmount?: (val: string) => void;
  onSelectToken?: () => void;
}

export default function TokenInputCard({
  label,
  token,
  amount,
  usdValue,
  onChangeAmount,
  onSelectToken,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Card */}
      <View style={styles.card}>
        {/* Left Token Section */}
        <TouchableOpacity style={styles.tokenBox} onPress={onSelectToken}>
          {/* Example ETH Logo (replace with your asset) */}
          <Image
            source={imageIndex.etherum}
            style={styles.tokenIcon}
          />
          <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
          <Text style={styles.tokenText}>{token}</Text>
          <Image source={imageIndex.down} style={{height:22, width:22}}/>
          {/* <Ionicons name="chevron-down" size={16} color="#000" /> */}
       </View>
        </TouchableOpacity>

        {/* Right Input Section */}
        <View style={styles.amountBox}>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={onChangeAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.usdValue}>{usdValue}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontFamily:fonts.semiBold,
    marginBottom: 8,
    color: "#000",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    
  },
  tokenBox: {
    // flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    paddingHorizontal:25,
    paddingVertical:35
  },
  tokenIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  tokenText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
    color: "#000",
  },
  amountBox: {
    flex: 1,
    paddingHorizontal: 12,
    // alignItems: "flex-end",
  },
  input: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
  usdValue: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
});
