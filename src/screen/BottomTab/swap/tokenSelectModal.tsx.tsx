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
import { data } from "./data";

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
  currentToken:any
}

const tokens = data

export default function TokenSelectModal({ visible, onClose, onSelect, currentToken }: Props) {
  const navigation = useNavigation()
  const renderToken = ({ item }:any) => (
    <TouchableOpacity onPress={() => {
      onClose()
      onSelect(item)
      // navigation.navigate(ScreenNameEnum.ConfirmSwapScreen)
    }} style={styles.tokenRow}>
      <Image source={{uri:item.image}} style={styles.tokenIcon} />
      <View style={styles.tokenInfo}>
        <Text style={styles.tokenName}>{item.name}</Text>
        <Text style={styles.tokenFullname}>{item.fullname}</Text>
      </View>
      <View style={styles.tokenPriceSection}>
        <Text style={styles.tokenPrice}>{item.current_price}</Text>
        <Text style={[styles.tokenChange,{color : item.price_change_percentage_24h>0 ? 'green':'red'}]}>{item.price_change_percentage_24h}</Text>
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
                <Image source={imageIndex.close} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
            </View>

            {/* Token List */}
            <FlatList
            showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 5
  },
  tokenIcon: { width: 35, height: 35, marginRight: 12 },
  tokenInfo: { flex: 1 },
  tokenName: { fontSize: 15, color: "#000", fontFamily: fonts.bold },
  tokenFullname: { fontSize: 13, color: "#666", fontFamily: fonts.regular },
  tokenPriceSection: { alignItems: "flex-end" },
  tokenPrice: { fontSize: 15, fontFamily: fonts.bold, color: "#000" },
  tokenChange: { fontSize: 13, fontFamily: fonts.regular },
});
