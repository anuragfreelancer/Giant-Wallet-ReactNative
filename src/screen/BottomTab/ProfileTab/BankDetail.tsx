import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const BankDetailsScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader
        menuIcon={imageIndex.back} label="Bank Details" navigation={navigation} leftPress={true} />
 

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Account name</Text>
          <Text style={styles.value}>Sahil Traders Pvt. Ltd.</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account number</Text>
          <Text style={styles.value}>**** **** 1234</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>IFSC code</Text>
          <Text style={styles.value}>HDFC0000458</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Branch</Text>
          <Text style={styles.value}>Andheri West, Mumbai</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Bank name</Text>
          <Text style={styles.value}>HDFC Bank</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Account type</Text>
          <Text style={styles.value}>Current</Text>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.deleteBtn}>
            {/* <Icon name="trash-2" size={16} color="#F97316" /> */}
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.editBtn}>
            {/* <Icon name="edit-3" size={16} color="#F97316" /> */}
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Add Account */}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>Add Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BankDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  content: {
    padding: 15,
  },
  detailRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F97316",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteText: {
    marginLeft: 5,
    color: "#F97316",
    fontWeight: "600",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F97316",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editText: {
    marginLeft: 5,
    color: "#F97316",
    fontWeight: "600",
  },
  addBtn: {
    backgroundColor: "#F97316",
    margin: 15,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
