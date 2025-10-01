import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../compoent/CustomHeader";
import LoadingModal from "../../utils/Loader";
import imageIndex from "../../assets/imageIndex";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../compoent/CustomButton";
// import { Ionicons } from "@expo/vector-icons"; // for dropdown arrow

export default function CustomNetworkForm() {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
  return (
       <SafeAreaView style={styles.container}>
      {/* Header */}
      {loading && <LoadingModal />}
      <CustomHeader
        menuIcon={imageIndex.back}
        label="Import Token"
        navigation={navigation}
        leftPress={true}
      />
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40, paddingHorizontal:20 }}>
      {/* Network Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Network name</Text>
        <TextInput
          placeholder="Enter network name"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
        />
      </View>

      {/* Default RPC URL */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Default RPC URL</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            placeholder="Add a URL"
            placeholderTextColor="#9E9E9E"
            style={styles.inputFlex}
          />
          {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
        </View>
      </View>

      {/* Chain ID */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chain ID</Text>
        <TextInput
          placeholder="Enter Chain ID"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          keyboardType="numeric"
        />
      </View>

      {/* Currency Symbol */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Currency symbol</Text>
        <TextInput
          placeholder="Enter symbol"
          placeholderTextColor="#9E9E9E"
          style={styles.input}
        />
      </View>

      {/* Block Explorer URL */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Block explorer URL</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            placeholder="Add a URL"
            placeholderTextColor="#9E9E9E"
            style={styles.inputFlex}
          />
          {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
        </View>
      </View>
    </ScrollView>
      <CustomButton title="Save" style={{ width: "90%", alignSelf: 'center', marginBottom: 15 }} />
 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: "#000",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  inputFlex: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
});
