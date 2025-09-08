import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../../../utils/Loader';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import { useRoute } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TokenDetailScreen = () => {
  const [tokenData, setTokenData] = useState<any>(null);
  const [priceData, setPriceData] = useState([]);
  const [timeRange, setTimeRange] = useState('7');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<any>(null);
  const route = useRoute()
  const id = route?.params?.id ?? "bitcoin"
  console.log(id)
  // Sample token ID for demonstration (Bitcoin)
  const tokenId = id;

  const fetchTokenData = async () => {
    try {
      setLoading(true)
      setError(null);
      // Fetch token details
      const tokenResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      const tokenJson = await tokenResponse.json();
      // Fetch historical price data
      const days = timeRange;
      const priceResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}&interval=${days === '1' ? 'hourly' : 'daily'}`
      );
      const priceJson = await priceResponse.json();
      setTokenData(tokenJson);
      setPriceData(priceJson.prices);
      setLoading(false)
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
      console.error(err);
      setLoading(false)

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, [timeRange]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTokenData();
  };

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getPriceChangeColor = (value: number) => {
    return value >= 0 ? '#4cd964' : '#ff3b30';
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading token data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        {/* <Ionicons name="alert-circle" size={64} color="#ff9500" /> */}
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTokenData}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!tokenData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  const chartData = {
    labels: [],
    datasets: [
      {
        data: priceData?.map((item) => item[1]),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0',
      strokeWidth: '0',
    },
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} >
      <CustomHeader menuIcon={imageIndex.back} label={""} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading && <LoadingModal />}
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.tokenHeader}>
            {tokenData?.image &&
              <Image
                source={{ uri: tokenData?.image?.large }}
                style={styles.tokenIcon}
              />
            }
            <View style={styles.tokenTitle}>
              <Text style={styles.tokenName}>{tokenData?.name}</Text>
              <Text style={styles.tokenSymbol}>
                {tokenData?.symbol?.toUpperCase()}
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            {/* <Ionicons name="star-outline" size={24} color="#000" /> */}
          </TouchableOpacity>
        </View>

        {/* Price Section */}
        {tokenData?.market_data &&
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>
              {formatPrice(tokenData?.market_data?.current_price.usd)}
            </Text>
            <View style={styles.priceChangeContainer}>
              <Text
                style={[
                  styles.priceChange,
                  { color: getPriceChangeColor(tokenData?.market_data?.price_change_percentage_24h) },
                ]}
              >
                {formatPercentage(tokenData?.market_data?.price_change_percentage_24h)}
              </Text>
              <Text style={styles.priceChangeLabel}> (24h)</Text>
            </View>
          </View>
        }
        {/* Chart */}
        {tokenData &&
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={width - 60}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              withInnerLines={false}
              withOuterLines={false}
              withDots={false}
            />
            <View style={styles.timeRangeSelector}>
              {['7', '30', '90', '365'].map((range) => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.timeRangeButton,
                    timeRange === range && styles.timeRangeButtonActive,
                  ]}
                  onPress={() => setTimeRange(range)}
                >
                  <Text
                    style={[
                      styles.timeRangeText,
                      timeRange === range && styles.timeRangeTextActive,
                    ]}
                  >
                    {/* {range === '1' ? '24H' : `${range}D`} */}
                    {`${range}D`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        }
        {/* Market Stats */}
        {tokenData?.market_data &&
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Market Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Market Cap</Text>
                <Text style={styles.statValue}>
                  {formatPrice(tokenData?.market_data?.market_cap.usd)}
                </Text>
                <Text style={styles.statRank}>Rank #{tokenData?.market_cap_rank}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Volume (24h)</Text>
                <Text style={styles.statValue}>
                  {formatPrice(tokenData?.market_data?.total_volume.usd)}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Circulating Supply</Text>
                <Text style={styles.statValue}>
                  {formatNumber(tokenData?.market_data?.circulating_supply)}{' '}
                  {tokenData?.symbol?.toUpperCase()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Supply</Text>
                <Text style={styles.statValue}>
                  {tokenData?.market_data?.total_supply
                    ? formatNumber(tokenData?.market_data?.total_supply)
                    : '∞'}{' '}
                  {tokenData?.symbol?.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        }

        {/* Price Changes */}
        <View style={[styles.statsContainer, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Price Changes</Text>
          <View style={styles.priceChanges}>
            <View style={styles.priceChangeRow}>
              <Text style={styles.priceChangeLabel}>24H</Text>
              <Text
                style={[
                  styles.priceChangeValue,
                  {
                    color: getPriceChangeColor(
                      tokenData?.market_data?.price_change_percentage_24h
                    ),
                  },
                ]}
              >
                {formatPercentage(tokenData?.market_data?.price_change_percentage_24h)}
              </Text>
            </View>
            <View style={styles.priceChangeRow}>
              <Text style={styles.priceChangeLabel}>7D</Text>
              <Text
                style={[
                  styles.priceChangeValue,
                  {
                    color: getPriceChangeColor(
                      tokenData?.market_data?.price_change_percentage_7d
                    ),
                  },
                ]}
              >
                {formatPercentage(tokenData?.market_data?.price_change_percentage_7d)}
              </Text>
            </View>
            <View style={styles.priceChangeRow}>
              <Text style={styles.priceChangeLabel}>30D</Text>
              <Text
                style={[
                  styles.priceChangeValue,
                  {
                    color: getPriceChangeColor(
                      tokenData?.market_data?.price_change_percentage_30d
                    ),
                  },
                ]}
              >
                {formatPercentage(tokenData?.market_data?.price_change_percentage_30d)}
              </Text>
            </View>
          </View>
        </View>

        {/* Links */}
        {/* <View style={styles.linksContainer}>
        <Text style={styles.sectionTitle}>Resources</Text>
        <View style={styles.links}>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Reddit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
             <Text style={styles.linkText}>Source Code</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f7',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8e8e93',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  tokenTitle: {
    justifyContent: 'center',
  },
  tokenName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  tokenSymbol: {
    fontSize: 16,
    color: '#8e8e93',
    marginTop: 2,
  },
  priceSection: {
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChange: {
    fontSize: 16,
    fontWeight: '600',
  },
  priceChangeLabel: {
    fontSize: 16,
    color: '#8e8e93',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    paddingLeft: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e6e6e6"
    // elevation: 2,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  timeRangeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeRangeButtonActive: {
    backgroundColor: '#007AFF',
  },
  timeRangeText: {
    color: '#8e8e93',
    fontSize: 14,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: 'white',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e6e6e6"
    // elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  statItem: {
    width: '48%',
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  statRank: {
    fontSize: 14,
    color: '#8e8e93',
  },
  priceChanges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceChangeRow: {
    alignItems: 'center',
  },
  priceChangeValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  linksContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  linkButton: {
    alignItems: 'center',
    padding: 12,
  },
  linkText: {
    marginTop: 8,
    color: '#007AFF',
    fontSize: 14,
  },
});

export default TokenDetailScreen;