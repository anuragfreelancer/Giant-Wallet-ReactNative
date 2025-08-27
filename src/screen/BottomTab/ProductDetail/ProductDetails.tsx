import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import { color, fonts } from '../../../constant';
import { hp } from '../../../utils/Constant';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';

const { width } = Dimensions.get('window');

const ProductDetailScreen = () => {
  const colors = ['#88EC83', '#FF9B00', '#76011E'];

  const specifications = [
    ['Clothing Size', 'XL'],
    ['Color', 'Yellow'],
    ['Model Type', 'Women'],
    ['Neck Type', 'Round Neck'],
    ['Sleeve', 'Full Sleeve'],
    ['Design', 'Floral/Patterned/Plain'],
    ['Fabric', 'Imported'],
    ['Product Code', '123456'],
    ['Top Type', 'Regular Top'],
  ];
  const [activeTab, setActiveTab] = useState('Video');

  const tabs = ['Video', 'Photo', 'Highlight'];

  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Product Image */}
          <ImageBackground imageStyle={{opacity:0.9}} source={imageIndex.b5} style={styles.imageWrapper}>
            {/* <Image
              source={imageIndex.b5}
              style={styles.productImage}
            /> */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Image source={imageIndex.back} style={{ height: 32, width: 32 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.cartBtn, right: 70 }}>
              <Image source={imageIndex.share} style={{ height: 34, width: 34 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartBtn}>
              <Image source={imageIndex.bag} style={{ height: 34, width: 34 }} />

            </TouchableOpacity>
            {/* <Image source={imageIndex.share} style={{ height: 34, width: 34, alignSelf:'center', alignV }} /> */}
            <View style={styles.tabContainer}>
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[
                    styles.tab,
                    activeTab === tab && styles.activeTab
                  ]}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ImageBackground>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>
              Mango Yellow Plain Premium 60 Lea Pure Linen Fabric (Width 58 inches)
            </Text>
            <View style={styles.specRow}>

              <View style={{ flex: 1, marginBottom: 10 }}>

                <Text style={styles.price}>₹899 <Text style={{ textDecorationLine: 'line-through', color: 'grey', fontSize: 12 }}>$1599</Text></Text>
              </View>
              <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={imageIndex.minus} style={styles.icon} />
                <Text style={{ ...styles.price, marginHorizontal: 15 }}>1</Text>
                <Image source={imageIndex.plus} style={styles.icon} />

              </View>
            </View>
            <View style={styles.specRow}>
              <View style={{ flex: 1, marginBottom: 10 }}>
                <Text style={styles.specKey}>Design</Text>
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
            {/* Description */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Women Comfortable Casual Wear Tops - Yellow Color
            </Text>

            {/* Color Options */}
            <View style={[styles.row,{justifyContent:'space-between'}]}>
            <Text style={styles.sectionTitle}>Color</Text>
            <TouchableOpacity onPress={()=>navigation.navigate(ScreenNameEnum.colorList)}>
            <Image source={imageIndex.right} style={{height:20, width:20}}/>
       </TouchableOpacity>
            </View>
            <View style={styles.colorContainer}>
              {colors.map((color, index) => (
                <View
                  key={index}
                  style={[styles.colorBox, { backgroundColor: color }]}
                />
              ))}
            </View>

            {/* Specification Section */}
            <Text style={styles.sectionTitle}>Specification</Text>
            <View style={styles.specContainer}>
              {specifications.map(([key, value], index) => (
                <View key={index} style={styles.specRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.specKey}>{key}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.specValue}>{value}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Review */}
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.row}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=12' }} // Replace with actual image URL
                style={styles.avatar}
              />
              <View style={styles.nameRatingContainer}>
                <Text style={styles.name}>Nolan Passaquindici</Text>
                <View style={styles.stars}>
                  <Image style={styles.star} source={imageIndex.star} />
                  <Image style={styles.star} source={imageIndex.star} />
                  <Image style={styles.star} source={imageIndex.star} />
                  <Image style={styles.star} source={imageIndex.star} />
                  <Image style={styles.star} source={imageIndex.star} />
                </View>
              </View>
            </View>

            {/* Review Text */}
            <Text style={styles.reviewText}>
              The workers are very professional and the results are very satisfying. Ske it very much.
            </Text>

            {/* Divider */}
            <View style={styles.divider} />
          </View>
        </ScrollView>

        {/* Bottom Bar */}
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

export default ProductDetailScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width,
    height: hp(50),
    position: 'relative',
    backgroundColor:'#000'
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
  cartBtn: {
    position: 'absolute',
    top: 40,
    right: 16,
    borderRadius: 20
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 6,
    color: '#000',
    fontFamily: fonts.bold,
    lineHeight: 30
  },
  price: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
    marginBottom: 4,
  },
  seller: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    marginTop: 16,
    marginBottom: 6,
    color: color.black,
    fontFamily: fonts.bold
  },
  description: {
    fontSize: 13,
    color: color.black,
    fontFamily: fonts.regular
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    gap: 10,
  },
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  specContainer: {
    // backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
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
  reviewBox: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 100,
  },
  reviewAuthor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
  },
  reviewText: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
    fontFamily: fonts.regular
  },
  bottomBar: {
    flexDirection: 'row',
    height: 90,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 20
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
    height: 45,
    width: 45
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  nameRatingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  star: {
    marginLeft: 1,
    height: 16,
    width: 16
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 2,
    alignSelf: 'flex-end'
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginTop: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.4)', // translucent
    borderRadius: 16,
    padding: 4,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    width:'90%'
  },
  tab: {
    
    borderRadius: 12,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height:50
  },
  activeTab: {
    backgroundColor: color.primary,
  },
  tabText: {
    color: '#fff',
    fontFamily:fonts.semiBold
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
});
