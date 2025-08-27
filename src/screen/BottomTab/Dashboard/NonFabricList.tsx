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
    Image,
} from 'react-native';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { color, fonts } from '../../../constant';
import Icon from '../../../compoent/Icon';

const { width } = Dimensions.get('window');

const DATA = [
    {
        id: '1',
        title: 'Non Woven Fabric',
        price: '$212.99',
        image: imageIndex.nf5,
        name: 'Green'
    },
    {
        id: '2',
        title: 'Holland Backing Non Woven Fabric',
        price: '$212.99',
        image: imageIndex.nf6,
        name: 'Red'

    },
    {
        id: '3',
        title: 'Holland Backing Fleece Fabric',
        price: '$212.99',
        image: imageIndex.s6,
        name: 'Pink'
    },
    {
        id: '4',
        title: 'Holland Plain Fabric',
        price: '$212.99',
        image: imageIndex.s7,
        name: 'Yellow'

    },
    {
        id: '1',
        title: 'Non Woven Fabric',
        price: '$212.99',
        image: imageIndex.nf5,
        name: 'Green'

    },
    {
        id: '2',
        title: 'Holland Backing Non Woven Fabric',
        price: '$212.99',
        image: imageIndex.nf6,
        name: 'Red'

    },
    {
        id: '3',
        title: 'Holland Backing Fleece Fabric',
        price: '$212.99',
        image: imageIndex.s6,
        name: 'Yellow'

    },
    {
        id: '4',
        title: 'Holland Plain Fabric',
        price: '$212.99',
        image: imageIndex.s7,
        name: 'Green'

    },
];
const ITEM_MARGIN = 12;
const ITEM_SIZE = (width - ITEM_MARGIN * 3) / 2;


const FabricCard = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity key={item.id} style={styles.itemCard}>
        <Image source={item.image} style={styles.itemImage} />
        <Image source={imageIndex.cartCircle} style={{ height: 25, width: 25, position: 'absolute', right: 20, top: 20 }} />

        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Green carper</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.itemName}>{item.price}</Text>
            <Text style={styles.itemPrice}><Icon source={imageIndex.star} colorIcon={color.primary} size={15} /> 5.0</Text>

        </View>
    </TouchableOpacity>
);

const NonFabricList = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingLeft: 15 }}>
                <CustomBackHeader menuIcon={imageIndex.back} label={"Non Woven Fabric"} />
            </View>
            <FlatList
                data={DATA}
                numColumns={2}
                renderItem={({ item, index }) => <FabricCard item={item} index={index} />}
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
        width: width / 2 - 16,
        alignSelf: 'center',
        // justifyContent: 'flex-end',
        backgroundColor: '#000',
        borderRadius: 20,
    },
    imageStyle: {
        borderRadius: 12,
        opacity: 0.7
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

    itemCard: {
        width: '48%',
        borderRadius: 10,
        // backgroundColor: '#f9f9f9',
        padding: 10,
    },
    itemImage: {
        height: 200,
        width: '100%',
        borderRadius: 10,
        marginBottom: 8,
    },
    itemName: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: '#000'
    },
    itemPrice: {
        color: '#555',
        fontSize: 12,
    },
});

export default NonFabricList;
