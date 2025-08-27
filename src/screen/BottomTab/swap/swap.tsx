// SwapScreen.tsx
import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import TokenInputCard from "./tokenInputCard";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { fonts } from "../../../constant";
import CustomButton from "../../../compoent/CustomButton";
import TokenSelectModal from "./tokenSelectModal.tsx";

export default function SwapScreen() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
 const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SWAP</Text>
      <TokenInputCard
        label="From"
        token="ETH"
        amount={fromAmount}
        usdValue="$0"
        onChangeAmount={setFromAmount}
        onSelectToken={() => console.log("Select From Token")}
      />

      <Image source={imageIndex.change} style={{height:40, width:40, alignSelf:'center', marginVertical:40}}/>

      <TokenInputCard
        label="To"
        token="ETH"
        amount={toAmount}
        usdValue="$0"
        onChangeAmount={setToAmount}
        onSelectToken={() => console.log("Select To Token")}
      />
      <CustomButton title="Swap" style={{marginTop:50}} onPress={()=>setModalVisible(true)}/>

          <TokenSelectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(token) => {
          console.log("Selected Token:", token);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title:{
    fontSize:30,
    fontFamily:fonts.bold,
    textAlign:'center'
  }
});
