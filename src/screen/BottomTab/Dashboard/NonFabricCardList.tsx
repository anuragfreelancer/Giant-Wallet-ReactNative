// FabricCardList.tsx
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';

const { width } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    title: 'Non Woven Fabric',
    price: '$212.99',
    image: imageIndex.nf5,
  },
  {
    id: '2',
    title: 'Holland Backing Non Woven Fabric',
    price: '$212.99',
    image: imageIndex.nf6,
  },
  {
    id: '3',
    title: 'Holland Backing Fleece Fabric',
    price: '$212.99',
    image: imageIndex.s6,
  },
  {
    id: '4',
    title: 'Holland Plain Fabric',
    price: '$212.99',
    image: imageIndex.s7,
  },
   {
    id: '1',
    title: 'Non Woven Fabric',
    price: '$212.99',
    image: imageIndex.nf5,
  },
  {
    id: '2',
    title: 'Holland Backing Non Woven Fabric',
    price: '$212.99',
    image: imageIndex.nf6,
  },
  {
    id: '3',
    title: 'Holland Backing Fleece Fabric',
    price: '$212.99',
    image: imageIndex.s6,
  },
  {
    id: '4',
    title: 'Holland Plain Fabric',
    price: '$212.99',
    image: imageIndex.s7,
  },
];
const ITEM_MARGIN = 12;
const ITEM_SIZE = (width - ITEM_MARGIN * 3) / 2;


const FabricCard = ({ item }: { item: any }) => 
{
  const navigation = useNavigation()
  return(
  <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={()=>navigation.navigate(ScreenNameEnum.NonFabricList)}>
    <ImageBackground source={ item.image } style={styles.image} imageStyle={styles.imageStyle}>
      {/* <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
      
    <Text style={styles.price}>{item.price}</Text>
      
      </View> */}
    </ImageBackground>
  </TouchableOpacity>
);
}

const NonFabricCardList = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{paddingLeft:15}}>
        <CustomBackHeader  menuIcon={imageIndex.back} label={"Non Woven Fabric"}/>
        </View>
    <FlatList
      data={DATA}
      numColumns={2}
      renderItem={({ item }) => <FabricCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container1}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={styles.row}
    />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    // marginBottom: 20,
  },
   container1: {
    padding: ITEM_MARGIN,
  },
    row: {
    justifyContent: 'space-between',
    marginBottom: ITEM_MARGIN,
  },
  image: {
    height: 180,
    width: width/2 - 16,
    alignSelf:'center',
    // justifyContent: 'flex-end',
    backgroundColor:'#000',
    borderRadius:20,
  },
  imageStyle: {
    borderRadius: 12,
    opacity:0.7
  },
  overlay: {
    // backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  price: {
    marginTop: 6,
    color: '#F7931E',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NonFabricCardList;
