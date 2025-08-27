import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../../constant";


const DocumentScreen = ({ navigation }) => {
  const [document, setDocument] = useState(true); // assume one doc uploaded

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader
        menuIcon={imageIndex.back} label="Document" navigation={navigation} leftPress={true} />
 <View style={{paddingHorizontal:20, flex:1}}>
      {/* Document Card */}
        <Image source={imageIndex.viewDoc} style={{height:250, width:'100%', marginTop:50, borderRadius:15, resizeMode:'contain'}}/>
          {/* <TouchableOpacity style={styles.viewBtn}>
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity> */}
        

      {/* Bottom Add Button */}
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingHorizontal: 15,
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
  card: {
    backgroundColor: color.primary,
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "red",
    borderRadius: 12,
    padding: 3,
  },
  viewBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 15,
  },
  viewText: {
    fontSize: 14,
    color:color.primary,
    fontWeight: "600",
  },
  addBtn: {
    backgroundColor:color.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: "auto", // pushes to bottom
    marginBottom: 20,
  },
  addText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default DocumentScreen;
