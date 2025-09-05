// TokenSelectModal.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

interface Token {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: string;
  change: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

const tokens = [
  { id: "1", name: "GTAN", fullname: "Giant Token", price: "$ 63,910.82", change: "-1.4%", icon: imageIndex.giantToken },
  { id: "2", name: "BTC", fullname: "Bitcoin", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bitcoin},
  { id: "3", name: "MATIC", fullname: "Polygon", price: "$ 5,910.00", change: "-1.4%", icon: imageIndex.matic },
  { id: "4", name: "ETH", fullname: "Ethereum", price: "$ 23.00", change: "-1.4%", icon: imageIndex.etherum },
  { id: "5", name: "BNB", fullname: "BNB Smart Chain", price: "$ 23.00", change: "-1.4%", icon: imageIndex.bnb },
];

export default function TokenSelectModal({ visible, onClose, onSelect, currentToken }: Props) {
const navigation =useNavigation()
    const renderToken = ({ item }) => (
      <TouchableOpacity onPress={()=>{
        onClose()
        navigation.navigate(ScreenNameEnum.ConfirmSwapScreen)
        }} style={styles.tokenRow}>
        <Image source={item.icon} style={styles.tokenIcon} />
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Text style={styles.tokenFullname}>{item.fullname}</Text>
        </View>
        <View style={styles.tokenPriceSection}>
          <Text style={styles.tokenPrice}>{item.price}</Text>
          <Text style={styles.tokenChange}>{item.change}</Text>
        </View>
      </TouchableOpacity>
    );
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Tokens</Text>
            <TouchableOpacity onPress={onClose}>
             <Image source={imageIndex.close} style={{height:25, width:25}}/>
            </TouchableOpacity>
          </View>

          {/* Token List */}
          <FlatList
            data={tokens}
            keyExtractor={(item) => item.id}
            renderItem={renderToken}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
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
