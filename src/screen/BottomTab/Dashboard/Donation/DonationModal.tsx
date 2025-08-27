import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { fonts } from "../../../../constant";

const DonateModal = ({ visible, onClose, onDonate }) => {
  const [amount, setAmount] = useState("");

  const handleDonate = () => {
    onDonate(amount);
    setAmount("");
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent}>
          {/* Title */}
          <Text style={styles.title}>How Much Wanna Donate?</Text>

          {/* Donation Options */}
          {["50", "100", "200"].map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.amountBtn}
              onPress={() => setAmount(value)}
            >
              <Text style={styles.amountText}>${value}</Text>
            </TouchableOpacity>
          ))}

          {/* Divider */}
          <Text style={styles.orText}>Or</Text>

          {/* Manual Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter price manually"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          {/* Donate Button */}
          <TouchableOpacity style={styles.donateBtn} onPress={handleDonate}>
            <Text style={styles.donateText}>Donate</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily:fonts.bold,
    marginBottom: 15,
    color: "#000",
  },
  amountBtn: {
    width: "90%",
    padding: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 10,
    height:60,

  },
  amountText: { fontSize: 16, color: "#333" , fontFamily:fonts.regular},
  orText: {
    marginVertical: 10,
    color: "#999",
    fontFamily:fonts.bold
  },
  input: {
    width: "90%",
    height:60,
    borderRadius: 30,
    backgroundColor: "#F5F5F5",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    fontFamily:fonts.regular
  },
  donateBtn: {
    backgroundColor: "#E53935",
    width: "90%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  donateText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default DonateModal;
