import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import CustomHeader from '../../compoent/CustomHeader';
import imageIndex from '../../assets/imageIndex';
import {color, fonts} from '../../constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from '../../compoent/SearchBar';
import {useSelector} from 'react-redux';
import {
  AddCustomNetworkAPI,
  AddCustomTokenAPI,
  Fetch_CointAPI,
  GetAllNetworkAPI,
  GetAllTokenAPI,
  GetTokenDetailAPI,
} from '../../Api/apiRequest';
import LoadingModal from '../../utils/Loader';
import CustomButton from '../../compoent/CustomButton';
import CustomDropdown from '../../compoent/CustomDropdown';

// Currency Data
const currencies = [
  {
    id: 'evmos',
    name: 'EVMOS',
    subtitle: 'Native Evmos',
    icon: imageIndex.evmos,
  },
  {id: 'stars', name: 'STARS', subtitle: 'Stargaze', icon: imageIndex.stars},
  {id: 'eth', name: 'ETH', subtitle: 'Ethereum', icon: imageIndex.eth},
  {id: 'atom', name: 'ATOM', subtitle: 'Cosmos', icon: imageIndex.atom},
  {id: 'kava', name: 'KAVA', subtitle: 'Kava', icon: imageIndex.kava},
  {id: 'dot', name: 'DOT', subtitle: 'Polkadot', icon: imageIndex.dot},
  {id: 'lung', name: 'LUNC', subtitle: 'Terra Classic', icon: imageIndex.lunc},
  {id: 'ksm', name: 'KSM', subtitle: 'Kusama', icon: imageIndex.ksm},
  {id: 'inj', name: 'INJ', subtitle: 'Native Injective', icon: imageIndex.inj},
];
const dataToken = [
  {
    name: 'BNB Smart Chain Testnet',
    symbol: 'ETH',
    chainId: 1,
    rpcUrl: 'https://sepolia.infura.io/v3/b68bdfe421f34d50a7590e57d8a33c45',
  },
  {
    name: 'Binance Smart Chain',
    symbol: 'BNB',
    chainId: 56,
    rpcUrl: 'https://bsc-dataseed.binance.org',
  },
];

const ImportTokenScreen = ({navigation}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('giant-token');
  const [search, setSearch] = useState('');
  const [coins, setCoins] = useState([]);
  const [activeTab, setActiveTab] = useState('Search');
  const [selectedToken, setSelectToken] = useState({});
  const [address, setAddress] = useState('');
  // const [address, setAddress] = useState('0xC1aDF8E7eB02A1bB4abf5747B8b9118c68ce72de')
  const isLogin = useSelector((state: any) => state?.auth);
  const [tokenData, setTokenData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    networkName: '',
    rpcUrl: '',
    chainId: '',
    symbol: '',
    explorerUrl: '',
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation Logic
  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!form.networkName.trim()) {
      newErrors.networkName = 'Please enter network name';
      valid = false;
    }

    if (!form.rpcUrl.trim()) {
      newErrors.rpcUrl = 'Please enter default RPC URL';
      valid = false;
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(form.rpcUrl)) {
      newErrors.rpcUrl = 'Please enter a valid URL';
      valid = false;
    }

    if (!form.chainId.trim()) {
      newErrors.chainId = 'Please enter Chain ID';
      valid = false;
    } else if (isNaN(form.chainId)) {
      newErrors.chainId = 'Chain ID must be a number';
      valid = false;
    }

    if (!form.symbol.trim()) {
      newErrors.symbol = 'Please enter currency symbol';
      valid = false;
    }

    if (!form.explorerUrl.trim()) {
      newErrors.explorerUrl = 'Please enter block explorer URL';
      valid = false;
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(form.explorerUrl)) {
      newErrors.explorerUrl = 'Please enter a valid URL';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ✅ Handle text change and remove error on type
  const handleChange = (field, value) => {
    setForm(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  // ✅ Submit Handler
  const handleSubmit = async() => {
    if (validate()) {
      // Alert.alert('Success', 'All fields are valid!');
      console.log('✅ Form Data:', form);
      const params = {
        ...form,
        token:isLogin?.token

      }
   const dd = await AddCustomNetworkAPI(params, setLoading)
    console.log(dd);
    console.log(dd)
    if(dd?.statusCode == 201){
      setActiveTab('Search');
      fetchCoins();
      setTokenData(null);
    }
    }
    
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    // const data = await Fetch_CointAPI(setLoading)
    const param = {
      token: isLogin?.token,
    };
    const data = await GetAllNetworkAPI(param, setLoading);
    setCoins(data?.data);
  };

  // Filtered list based on search
  const filteredData =
    coins.length > 0 &&
    coins?.filter(
      item =>
        item?.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.symbol.toLowerCase().includes(search.toLowerCase()),
    );
 
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedCurrency(item._id)}>
      <View style={styles.leftRow}>
        {item?.image ? (
          <Image
            source={{uri: item.image}}
            style={styles.icon}
            onError={() => (item.image = null)} // fallback if image fails to load
          />
        ) : (
          <View style={styles.fallbackIcon}>
            <Text style={styles.fallbackText}>
              {item?.name?.charAt(0)?.toUpperCase() || '?'}
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
          selectedCurrency === item._id && styles.radioOuterActive,
        ]}>
        {selectedCurrency === item._id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {loading && <LoadingModal />}
      <CustomHeader
        menuIcon={imageIndex.back}
        label="Import Network"
        navigation={navigation}
        leftPress={true}
      />
      {/* Search Bar */}

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Search' && styles.activeTab]}
          onPress={() => setActiveTab('Search')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Search' && styles.activeTabText,
            ]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'Custom Network' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('Custom Network')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Custom Network' && styles.activeTabText,
            ]}>
            Custom Network
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab == 'Search' ? (
        <View>
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search a Network..."
              value={search}
              onSearchChange={setSearch}
            />
          </View>

          {/* Currency List */}
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 15}}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{paddingBottom: 40, paddingHorizontal: 20}}
          keyboardShouldPersistTaps="handled">
          {/* Network Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>Network Name</Text>
            <TextInput
              placeholder="Enter network name"
              placeholderTextColor="#9E9E9E"
              style={[styles.input, errors.networkName && styles.errorInput]}
              value={form.networkName}
              onChangeText={text => handleChange('networkName', text)}
            />
            {errors.networkName ? (
              <Text style={styles.errorText}>{errors.networkName}</Text>
            ) : null}
          </View>

          {/* Default RPC URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>Default RPC URL</Text>
            <TextInput
              placeholder="Add a URL"
              placeholderTextColor="#9E9E9E"
              style={[styles.input, errors.rpcUrl && styles.errorInput]}
              value={form.rpcUrl}
              onChangeText={text => handleChange('rpcUrl', text)}
            />
            {errors.rpcUrl ? (
              <Text style={styles.errorText}>{errors.rpcUrl}</Text>
            ) : null}
          </View>

          {/* Chain ID */}
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>Chain ID</Text>
            <TextInput
              placeholder="Enter Chain ID"
              placeholderTextColor="#9E9E9E"
              style={[styles.input, errors.chainId && styles.errorInput]}
              value={form.chainId}
              keyboardType="numeric"
              onChangeText={text => handleChange('chainId', text)}
            />
            {errors.chainId ? (
              <Text style={styles.errorText}>{errors.chainId}</Text>
            ) : null}
          </View>

          {/* Currency Symbol */}
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>Currency Symbol</Text>
            <TextInput
              placeholder="Enter symbol"
              placeholderTextColor="#9E9E9E"
              style={[styles.input, errors.symbol && styles.errorInput]}
              value={form.symbol}
              onChangeText={text => handleChange('symbol', text)}
            />
            {errors.symbol ? (
              <Text style={styles.errorText}>{errors.symbol}</Text>
            ) : null}
          </View>

          {/* Block Explorer URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label1}>Block Explorer URL</Text>
            <TextInput
              placeholder="Add a URL"
              placeholderTextColor="#9E9E9E"
              style={[styles.input, errors.explorerUrl && styles.errorInput]}
              value={form.explorerUrl}
              onChangeText={text => handleChange('explorerUrl', text)}
            />
            {errors.explorerUrl ? (
              <Text style={styles.errorText}>{errors.explorerUrl}</Text>
            ) : null}
          </View>
        </ScrollView>
      )}
      {activeTab == 'Custom Network' && (
        <CustomButton
          onPress={() => {
            if (activeTab == 'Search') {
            } else {
              handleSubmit();
            }
          }}
          title="Add Network"
          style={{
            width: '90%',
            alignSelf: 'center',
            marginBottom: 15,
            position: 'absolute',
            bottom: 20,
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginTop: 0,
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: '#000',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.6,
    borderBottomColor: '#eee',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: fonts.bold,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    fontFamily: fonts.regular,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    overflow: 'hidden',
    margin: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#D32F2F',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#D32F2F',
  },
  activeTabText: {
    color: '#fff',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    height: 60,
  },
  dropdownText: {
    color: '#9E9E9E',
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
  inputGroup: {
    marginBottom: 20,
  },
  label1: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  inputFlex: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },

  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ImportTokenScreen;
