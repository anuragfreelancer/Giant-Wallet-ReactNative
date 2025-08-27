import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { color, fonts } from '../../../constant';

const ColorList = () => {
  const [quantities, setQuantities] = useState({});

  const colors = [
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },
    { id: '1', name: 'light green', hex: '#90EE90' },
    { id: '2', name: 'Orange', hex: '#FFA500' },
    { id: '3', name: 'Burgundy', hex: '#800020' },

  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const newQty = Math.max(1, current + delta); // Minimum 1
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Section with Image and Pricing */}
      <ScrollView contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 16, 
      }} showsVerticalScrollIndicator={false}>
        <CustomBackHeader menuIcon={imageIndex.back} label={"Color (31)"} />

        <View style={styles.topSection}>
          <Image
            source={imageIndex.b5}
            style={styles.image}
          />
          <View style={styles.priceDetails}>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>$95.36</Text>
              <Text style={styles.priceTextBold}>$94.48</Text>
            </View>
            <View style={styles.minOrderRow}>
              <Text style={styles.subText}>Min. order: 1000 meters</Text>
              <Text style={styles.subText}>5000+ meters</Text>
            </View>
          </View>
        </View>

        {/* Color Options */}
        <FlatList
          data={colors}
          contentContainerStyle={{paddingBottom: 200}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.colorRow}>
              <View style={[styles.colorBox, { backgroundColor: item.hex }]} />
              <Text style={styles.colorName}>{item.name}</Text>

              <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={imageIndex.minus} style={styles.icon} />
                <Text style={{ ...styles.priceText, marginHorizontal: 15 }}>1</Text>
                <Image source={imageIndex.plus} style={styles.icon} />

              </View>

            </View>
          )}
        />
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.specRow}>
          <View style={{ flex: 1, marginBottom: 10 }}>
            <Text style={styles.specKey}>Color</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.specValue}>2727 Non Woven C-10</Text>
          </View>
        </View>
        <View style={styles.specRow}>
          <View style={{ flex: 1, marginBottom: 10 }}>
            <Text style={styles.specKey}>Meter</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', }}>
            <Text style={styles.specValue}>50mtr</Text>
          </View>
        </View>
        <View style={styles.bottomBar}>

          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatText}>Chat Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ColorList;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 12,
  },
  priceDetails: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    color: '#000',
    fontFamily: fonts.semiBold
  },
  priceTextBold: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: '#000',

  },
  minOrderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  subText: {
    fontSize: 12,
    color: '#999',
    fontFamily: fonts.regular

  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  specKey: {
    fontSize: 15,
    color: '#555',
    flex: 0.5,
    fontFamily: fonts.regular
  },
  specValue: {
    fontSize: 15,
    color: '#555',
    flex: 0.5,
    textAlign: 'left',
    fontFamily: fonts.regular


  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  colorBox: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 16,
  },
  colorName: {
    flex: 1,
    fontSize: 16,

    color: '#000',
    fontFamily: fonts.semiBold

  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 36,
  },
  counterButton: {
    fontSize: 20,
    fontWeight: '600',
    color: '#555',
    paddingHorizontal: 8,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
    color: '#000',
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    left: 0,
    right: 0,
    //  alignItems:'center',
    //  justifyContent:'center'
    paddingTop: 10,
    paddingHorizontal: 20
  },
  bottomBar: {
    flexDirection: 'row',
    height: 90,

    // borderTopWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',

  },
  chatButton: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    // marginLeft: 15,
    borderRadius: 25,
    borderColor: color.primary,
    height: 50
  },
  chatText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: color.primary,
  },
  cartButton: {
    flex: 0.45,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50

  },
  cartText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#fff',
  },
  icon: {
    height: 35,
    width: 35
  },
});
