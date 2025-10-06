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
import { AddCustomTokenAPI, Fetch_CointAPI, GetAllTokenAPI, GetTokenDetailAPI } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import CustomButton from "../../compoent/CustomButton";
import CustomDropdown from "../../compoent/CustomDropdown";

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
const dataToken = [
  {
    "name": "BNB Smart Chain Testnet",
    "symbol": "ETH",
    "chainId": 1,
    "rpcUrl": "https://sepolia.infura.io/v3/b68bdfe421f34d50a7590e57d8a33c45"
  },
  {
    "name": "Binance Smart Chain",
    "symbol": "BNB",
    "chainId": 56,
    "rpcUrl": "https://bsc-dataseed.binance.org"
  },

]



const ImportTokenScreen = ({ navigation }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("giant-token");
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [activeTab, setActiveTab] = useState("Search");
  const [selectedToken, setSelectToken] = useState({})
  const [address, setAddress] = useState('')
  // const [address, setAddress] = useState('0xC1aDF8E7eB02A1bB4abf5747B8b9118c68ce72de')
  const isLogin = useSelector((state: any) => state?.auth);
  const [tokenData, setTokenData] = useState(null)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    // const data = await Fetch_CointAPI(setLoading)
    const param = {
      token: isLogin?.token
    }
    const data = await GetAllTokenAPI(param, setLoading)
    setCoins(data?.data)
  };

  // Filtered list based on search
  const filteredData = coins.length>0 && coins?.filter(
    (item) =>
      item?.name.toLowerCase().includes(search.toLowerCase()) ||
      item?.symbol.toLowerCase().includes(search.toLowerCase())
  );
  const handleNext = async () => {
    if (tokenData?.symbol) {
      const param = {
        ...tokenData,
        token: isLogin?.token,
        address
      }
      const dd = await AddCustomTokenAPI(param, setLoading)
      console.log(dd)
      setActiveTab('Search')
      fetchCoins()
      setTokenData(null)
    } else {
      console.log({
        address,
        selectedToken
      })
      const param = {
        address,
        rpc: selectedToken
      }
      const data = await GetTokenDetailAPI(param, setLoading)
      console.log(data?.data)
      setTokenData(data?.data)
    }
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedCurrency(item.id)}
    >
      <View style={styles.leftRow}>
        {item?.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.icon}
            onError={() => (item.image = null)} // fallback if image fails to load
          />
        ) : (
          <View style={styles.fallbackIcon}>
            <Text style={styles.fallbackText}>
              {item?.name?.charAt(0)?.toUpperCase() || "?"}
            </Text>
          </View>
        )}

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


      {activeTab == "Search" ?
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
        <View>

          <View style={{ marginHorizontal: 20, marginBottom: 15, }}>
            {/* <Text style={[styles.dropdownText,{color:'#000', }]}>Token Decimal:</Text> */}

            <CustomDropdown
              backgroundColor="#F7F7F7"
              data={dataToken?.map((item) => ({ label: item?.name, value: item?.rpcUrl }))}
              onSelect={(item) => setSelectToken(item)}
              placeholder="Select a network"

            />

          </View>

          {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
          <Text style={[styles.dropdownText, { marginLeft: 20, marginVertical: 5, color: '#000', }]}>Token contract address:</Text>

          <View style={[styles.dropdown, { marginBottom: 15, paddingVertical: 0 }]}>
            <TextInput value={address} onChangeText={setAddress} style={styles.dropdownText} placeholder="Token contract address" />
            {/* <Ionicons name="chevron-down" size={18} color="#D32F2F" /> */}
          </View>
          {tokenData && tokenData?.symbol &&
            <View>
              <Text style={[styles.dropdownText, { marginLeft: 20, marginVertical: 5, color: '#000', }]}>Token symbol:</Text>
              <View style={[styles.dropdown, { marginBottom: 15, }]}>
                <Text style={styles.dropdownText}>{tokenData?.symbol}</Text>
              </View>
              <Text style={[styles.dropdownText, { marginLeft: 20, marginVertical: 5, color: '#000', }]}>Token Decimal:</Text>

              <View style={[styles.dropdown, { marginBottom: 15, }]}>
                <Text style={styles.dropdownText}>{tokenData?.number}</Text>
              </View>
            </View>
          }
        </View>
      }
      <CustomButton onPress={() => {
        if (activeTab == "Search") {

        } else {
          handleNext()
        }
      }
      } title="Next" style={{ width: "90%", alignSelf: 'center', marginBottom: 15, position: 'absolute', bottom: 20 }} />
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
    borderRadius: 15,
    justifyContent: "space-between",
    marginHorizontal: 20,
    height: 60
  },
  dropdownText: {
    color: "#9E9E9E",
    fontSize: 14,

  },
  fallbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  fallbackText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ImportTokenScreen;
