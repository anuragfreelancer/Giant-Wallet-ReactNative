import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import imageIndex from '../../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color, fonts } from '../../../../constant';
import CustomHeader from '../../../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../../routes/screenName.enum';

const transactions = [
  { id: '1', type: 'Sent', hash: '0x8Bc77482...', amount: '0 ETH' },
  { id: '2', type: 'Sent', hash: '0x8Bc77482...', amount: '0 ETH' },
  { id: '3', type: 'Received', hash: '0xf36f148d...', amount: '+0.001 ETH' },
  { id: '4', type: 'Received', hash: '0xf36f148d...', amount: '+0.001 ETH' },
  { id: '5', type: 'Sent', hash: '0x8Bc77482...', amount: '0 ETH' },
  { id: '6', type: 'Received', hash: '0xf36f148d...', amount: '+0.001 ETH' },
];

const TransactionItem = ({ item }) => {
  const isSent = item.type === 'Sent';
  return (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        {isSent ? (
                <Image source={imageIndex.download} style={{height:40, width:40}}/>

        ) : (
                 <Image source={imageIndex.download} style={{height:40, width:40}}/>

        )}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionHash}>{item.hash}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: isSent ? '#FF3B30' : '#34C759' }]}>
        {item.amount}
      </Text>
    </View>
  );
};

const SendEth = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <CustomHeader
        menuIcon={imageIndex.back}
        label="Send"
        navigation={navigation}
        leftPress={true}
      />
      <View style={{marginHorizontal:16}}>
      {/* Crypto Info */}
      <View style={styles.cryptoInfo}>
        <View style={styles.cryptoLogo}>
          <Image
            source={imageIndex.eth} 
            style={{ width: 50, height: 50 }}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.cryptoTitle}>ETH</Text>
        <Text style={styles.cryptoSubtitle}>Ethereum</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={()=>navigation.navigate(ScreenNameEnum.sendPayment)}>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Receive</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ marginTop: 20 }}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
   
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    
    marginRight: 40, // Adjust for back button
    fontFamily:fonts.bold
  },
  cryptoInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cryptoLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cryptoTitle: {
    fontSize: 22,
    fontFamily:fonts.bold
    
  },
  cryptoSubtitle: {
    fontSize: 14,
    color: 'gray',
    fontFamily:fonts.regular

  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  actionButton: {
    flex: 0.48,
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  actionButtonText: {
    color: 'white',
    fontFamily:fonts.bold,
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionType: {
    fontFamily:fonts.regular,
    fontSize: 16,
    color:'#9DB2BF'
  },
  transactionHash: {
    color: '#9DB2BF',
    fontSize: 12,

    fontFamily:fonts.regular

  },
  transactionAmount: {
    fontFamily:fonts.semiBold,
    
    fontSize: 16,
  },
});

export default SendEth;
