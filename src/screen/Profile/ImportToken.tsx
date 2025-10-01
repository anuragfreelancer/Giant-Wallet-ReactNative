import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import CustomHeader from "../../compoent/CustomHeader";
import imageIndex from "../../assets/imageIndex";
import { color, fonts } from "../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../../compoent/SearchBar";
import { useSelector } from "react-redux";
import { Fetch_CointAPI } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import CustomButton from "../../compoent/CustomButton";

// Currency Data
const currencies = [
  { id: "evmos", name: "EVMOS", subtitle: "Native Evmos", icon: imageIndex.evmos },
  { id: "stars", name: "STARS", subtitle: "Stargaze", icon: imageIndex.stars },
  { id: "eth", name: "ETH", subtitle: "Ethereum", icon: imageIndex.eth },
  { id: "atom", name: "ATOM", subtitle: "Cosmos", icon: imageIndex.atom },
  { id: "kava", name: "KAVA", subtitle: "Kava", icon: imageIndex.kava },
  { id: "dot", name: "DOT", subtitle: "Polkadot", icon: imageIndex.dot },
  { id: "lung", name: "LUNC", subtitle: "Terra Classic", icon: imageIndex.lunc },
  { id: "ksm", name: "KSM", subtitle: "Kusama", icon: imageIndex.ksm },
  { id: "inj", name: "INJ", subtitle: "Native Injective", icon: imageIndex.inj },
];

const ImportTokenScreen = ({ navigation }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("giant-token");
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("Search");

  const isLogin = useSelector((state: any) => state?.auth);

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    const data = await Fetch_CointAPI(setLoading)
    setCoins(data)
  };

  // Filtered list based on search
  const filteredData = coins.filter(
    (item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()) ||
      item?.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedCurrency(item.id)}
    >
      <View style={styles.leftRow}>
        <Image source={{ uri: item?.image }} style={styles.icon} />
        <View>
          <Text style={styles.label}>{item.name}</Text>
          <Text style={styles.subtitle}>{item.symbol}</Text>
        </View>
      </View>
      <View
        style={[
          styles.radioOuter,
          selectedCurrency === item.id && styles.radioOuterActive,
        ]}
      >
        {selectedCurrency === item.id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

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
      {/* Search Bar */}


      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Search" && styles.activeTab]}
          onPress={() => setActiveTab("Search")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Search" && styles.activeTabText,
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "Custom Token" && styles.activeTab]}
          onPress={() => setActiveTab("Custom Token")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Custom Token" && styles.activeTabText,
            ]}
          >
            Custom Token
          </Text>
        </TouchableOpacity>
      </View>

       <View style={styles.dropdown}>
        <Text style={styles.dropdownText}>Ethereum Mainnet</Text>
        {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
      </View>
{activeTab == "Search"?
<View>
      <View style={styles.searchContainer}>
        <SearchBar placeholder="Search a Token..."
          value={search}
          onSearchChange={setSearch} />


      </View>
 
      {/* Currency List */}
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
      />
      </View>
      :
      
      <View style={[styles.dropdown,{marginVertical:15, paddingVertical:0}]}>
        <TextInput style={styles.dropdownText} placeholder="Token contract address"/>
        {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
      </View>
      }
      <CustomButton title="Next" style={{ width: "90%", alignSelf: 'center', marginBottom: 15 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#000",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.6,
    borderBottomColor: "#eee",
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: fonts.bold,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    fontFamily: fonts.regular,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: color.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: color.primary,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
    margin: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#D32F2F",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D32F2F",
  },
  activeTabText: {
    color: "#fff",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 30,
    justifyContent: "space-between",
    marginHorizontal:20,
    height:60
  },
  dropdownText: {
    color: "#9E9E9E",
    fontSize: 14,

  },
});

export default ImportTokenScreen;
