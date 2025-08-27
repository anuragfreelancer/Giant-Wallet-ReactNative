import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomHeader from "../../../../compoent/CustomHeader";
import imageIndex from "../../../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function BuyDetailScreen() {
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
                label="Buy"
                navigation={navigation}
                leftPress={true}
            />
      {/* Buy/Sell Row */}
      <View style={{paddingHorizontal:20}}>
      <View style={styles.rowBetween}>
        <Text style={styles.subTitle}>
          Buy Bitcoin <Text style={{ fontSize: 12, color: "#777" }}>(BTC)</Text>
        </Text>
        <TouchableOpacity style={styles.sellBtn}>
          <Text style={styles.sellBtnText}>SELL BTC</Text>
        </TouchableOpacity>
      </View>

      {/* Enter Amount */}
      <View style={styles.amountBox}>
        <Text style={styles.label}>Enter Amount in INR</Text>
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
    fontWeight: "600",
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
    fontWeight: "500",
  },
  sellBtn: {
    backgroundColor: "#ffe6e9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sellBtnText: {
    color: "red",
    fontWeight: "600",
  },
  amountBox: {
    alignItems: "center",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  amount: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },
  limitText: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
  },
  balanceText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    fontWeight: "500",
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
    fontWeight: "500",
  },
});
