import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../../assets/imageIndex";
import CustomHeader from "../../../../compoent/CustomHeader";
import SearchBar from "../../../../compoent/SearchBar";
import { color, fonts } from "../../../../constant";
import ScreenNameEnum from "../../../../routes/screenName.enum";


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

const SellScreen = ({ navigation }) => {
    const [selectedCurrency, setSelectedCurrency] = useState("eth");
    const [search, setSearch] = useState("");

    // Filtered list based on search
    const filteredData = currencies.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate(ScreenNameEnum.SellDetail)}
        >
            <View style={styles.leftRow}>
                <Image source={item.icon} style={styles.icon} />
                <View>
                    <Text style={styles.label}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>
            <View
            >
                <Text style={[styles.subtitle, { textAlign: 'right' }]}>0</Text>
                <Text style={[styles.subtitle, { textAlign: 'right' }]}>$0.00</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <CustomHeader
                menuIcon={imageIndex.back}
                label="Sell"
                navigation={navigation}
                leftPress={true}
            />
          
            {/* Currency List */}
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 15 }}
            />
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
});

export default SellScreen;
