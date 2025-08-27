// ConfirmSwapScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../compoent/CustomButton";
import { color, fonts } from "../../../constant";
import { wp } from "../../../utils/Constant";

export default function ConfirmSwapScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <CustomHeader label={"Confirm    "} menuIcon={imageIndex.back}/>

      <ScrollView contentContainerStyle={{ flexGrow: 1,  
    paddingHorizontal: 20, marginTop:20

       }}>
        
        {/* Confirmation Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Slippage Tolerance <Text style={styles.highlight}>Edit</Text>
            </Text>
            <Text style={styles.value}>2%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Rate</Text>
            <Text style={styles.value}>10 BNB {'\n'}= 2.15743 ETH</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Inverse Rate</Text>
            <Text style={styles.value}>10 ETH {'\n'} = 0.15743 BNB</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>USD Price</Text>
            <Text style={styles.value}>BNB {'\n'} ≈ $286.32</Text>
          </View>

          <View style={[styles.row,{borderBottomWidth:0}]}>
            <Text style={styles.label}>
              Estimated Fee <Text style={styles.highlight}>Edit</Text>
            </Text>
            <Text style={styles.value}>1.2 BNB</Text>
          </View>
        </View>
      </ScrollView>

      {/* Swap Button */}
    <CustomButton title="Swap" style={styles.swapButton}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    
    color: "#000",
    fontFamily:fonts.bold
  },
  card: {
    backgroundColor: "#FFE9E9",
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    padding:20,
     borderBottomWidth:1,
    borderColor:'#FFB4B4'
   
  },
  label: {
    fontSize: 14,
    color: "#111827",
    fontFamily:fonts.medium,

  },
  value: {
    fontSize: 14,
    fontFamily:fonts.semiBold,
    color: "#000",
    textAlign:'right'
  },
  highlight: {
    color: color.primary,
    fontFamily:fonts.bold,
    
  },
  swapButton: {
    width:wp(100) - 40,
    alignSelf:'center',
    marginBottom:20
  },
  swapText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
