import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import CustomHeader from "../../../../compoent/CustomHeader";
import imageIndex from "../../../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../../../constant";
import ScreenNameEnum from "../../../../routes/screenName.enum";


export default function SellDetailScreen() {
  const [amount, setAmount] = useState(0);
  const navigation = useNavigation()
  const balance = 10000; // Example Balance
  const minLimit = 100;
  const maxLimit = 1000000; // 10,00,000

  const handlePercentage = (percent) => {
    const newAmount = (balance * percent) / 100;
    setAmount(newAmount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        menuIcon={imageIndex.back}
        label="Sell"
        navigation={navigation}
        leftPress={true}
      />
      {/* Buy/Sell Row */}
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.subTitle}>
            Buy Bitcoin <Text style={{ fontSize: 12, color: "#777" }}>(BTC)</Text>
          </Text>
          <TouchableOpacity style={styles.sellBtn}  onPress={()=>navigation.navigate(ScreenNameEnum.SendEth)}>
            <Text style={styles.sellBtnText}>Sell BTC</Text>
          </TouchableOpacity>
        </View>

        {/* Enter Amount */}
        <View style={styles.amountBox}>
          <TextInput
           style={styles.label}
           placeholder="Enter Amount in INR"
           keyboardType="number-pad"
           />
          <Text style={styles.amount}>${amount}</Text>
        </View>

        {/* Min / Max */}
        <Text style={styles.limitText}>
          Min ${minLimit} - Max ${maxLimit.toLocaleString()}
        </Text>

        {/* Balance */}
        <Text style={styles.balanceText}>Current Balance: ${balance.toLocaleString()}</Text>

        {/* Percentage Buttons */}
        <View style={styles.percentContainer}>
          {["0", "10", "25", "50", "75", "100"].map((p) => (
            <TouchableOpacity
              key={p}
              style={styles.percentBtn}
              onPress={() => handlePercentage(parseInt(p))}
            >
              <Text style={styles.percentText}>{p} %</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontFamily:fonts.bold,
    marginRight: 35, // to balance backBtn
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    fontFamily:fonts.medium,
    
  },
  sellBtn: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  sellBtnText: {
    color: "red",
    fontFamily:fonts.medium,
  },
  amountBox: {
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
    fontFamily:fonts.regular,
    textAlign:'center'

  },
  amount: {
    fontSize: 28,
    fontFamily:fonts.medium,
    
    marginTop: 10,
  },
  limitText: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
    fontFamily:fonts.regular,

  },
  balanceText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontFamily:fonts.medium,
    
  },
  percentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  percentBtn: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  percentText: {
    fontSize: 14,
    fontFamily:fonts.medium,
    
  },
});
