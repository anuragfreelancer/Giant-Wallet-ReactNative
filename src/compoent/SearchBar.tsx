import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import imageIndex from "../assets/imageIndex";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?:string
 }

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search", onSearchChange ,value, bgColor, icon}) => {
  return (
    <View style={[styles.searchBar,{backgroundColor: bgColor ? "#f2f2f2" : "#F3F4F5",}]}>
      <Image source={icon? icon: imageIndex.search} style={styles.icon} resizeMode="cover" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#AAAAAA"
        onChangeText={onSearchChange}
        value={value}
      />
      {/* <Image source={imageIndex.filter} style={styles.icon} resizeMode="cover"  /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#F3F4F5",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 30,
    // borderWidth: 1,
    height: 50,
  // borderColor:'#fae9e9ff',
  
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#AAAAAA",
    marginLeft: 15,
  },
});

export default SearchBar;
