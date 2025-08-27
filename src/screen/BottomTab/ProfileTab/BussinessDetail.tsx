import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../../constant";


const BusinessDetailsScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState("FabricNest");
  const [aadhaar, setAadhaar] = useState("9856-7412-2360");
  const [pan, setPan] = useState("ABCDE1234F");
  const [gst, setGst] = useState("22AAAAA0000A1Z5");

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
         <CustomHeader
        menuIcon={imageIndex.back} label="Business Details" navigation={navigation} leftPress={true} />
 
    <View style={styles.container}>
      {/* Header */}
     
      {/* Form */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Business Name</Text>
          <TextInput
            style={styles.input}
            value={businessName}
            onChangeText={setBusinessName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Owner Aadhaar Number</Text>
          <TextInput
            style={styles.input}
            value={aadhaar}
            onChangeText={setAadhaar}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Owner PAN Number</Text>
          <TextInput
            style={styles.input}
            value={pan}
            onChangeText={setPan}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Owner GST Number</Text>
          <TextInput
            style={styles.input}
            value={gst}
            onChangeText={setGst}
            autoCapitalize="characters"
          />
        </View>
      </ScrollView>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop:15
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  backButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    padding: 6,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    height:55
  },
  editBtn: {
    backgroundColor: color.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  editText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default BusinessDetailsScreen;
