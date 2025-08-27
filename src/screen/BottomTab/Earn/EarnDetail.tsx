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
     <CustomHeader label={"Ethereum    "} menuIcon={imageIndex.back}/>

      <ScrollView contentContainerStyle={{ flexGrow: 1,  
    paddingHorizontal: 20, marginTop:20

       }}>
        
        {/* Confirmation Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Available </Text>
            <Text style={styles.value}>0 ETH</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Stacked</Text>
            <Text style={styles.value}>0 ETH </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Minimum Amount</Text>
            <Text style={styles.value}>0.025 ETH </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>APR</Text>
            <Text style={styles.value}>3.37%</Text>
          </View>

          <View style={[styles.row,{borderBottomWidth:0}]}>
            <Text style={styles.label}>
              Lock Time 
               </Text>
            <Text style={styles.value}>4 days</Text>
          </View>
        </View>
      </ScrollView>

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
