import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { color, fonts } from "../../../constant";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import CustomHeader from "../../../compoent/CustomHeader";

const orders = [
    {
        id: "1",
        title: "Jaunty Carpets",
        price: "$20.00",
        delivery: "15 min 1.5km Free Delivery",
        orderId: "Order.14523652",
        image: imageIndex.b1, // local image
    },
    {
        id: "2",
        title: "Nendle Printed",
        price: "$20.00",
        delivery: "15 min 1.5km Free Delivery",
        orderId: "Order.14523652",
        image: imageIndex.b2,
    },
    {
        id: "3",
        title: "HOKIPO Digitally",
        price: "$20.00",
        delivery: "15 min 1.5km Free Delivery",
        orderId: "Order.14523652",
        image: imageIndex.b3,
    },
];

const OrderList = () => {
    const [activeTab, setActiveTab] = useState<'paid' | 'unpaid'>('paid');
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {/* Header: price + orderId */}
            <View style={styles.header}>
                <Text style={styles.price}>{""}</Text>
                <Text style={styles.orderId}>{item.orderId}</Text>
            </View>

            {/* Image + Details */}
            <View style={styles.row}>
                <Image source={item.image} style={styles.image} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.price}>{item.price}</Text>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.delivery}>{item.delivery}</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.trackBtn}>
                    <Text style={styles.trackText}>Track Order</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <CustomHeader label={"OrderHistory"} menuIcon={imageIndex.back} />
            {/* Tabs */}
            <View style={{ paddingHorizontal: 15 }}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'paid' && styles.activeTab]}
                        onPress={() => setActiveTab('paid')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'paid' && styles.activeTabText,
                            ]}
                        >
                            Running Order
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'unpaid' && styles.activeTab]}
                        onPress={() => setActiveTab('unpaid')}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === 'unpaid' && styles.activeTabText,
                            ]}
                        >
                            Past Order
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={orders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 15 }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },

    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        // elevation: 3,
        borderWidth: 1,
        borderColor: '#EBEBEB'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    price: {
        color: color.primary,
        fontSize: 16,
        fontWeight: "700",
    },
    orderId: {
        color: "#999",
        fontSize: 12,
    },
    row: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 3,
    },
    delivery: {
        color: "#666",
        fontSize: 12,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 15,
    },
    trackBtn: {
        backgroundColor: color.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        width: '40%',

    },
    trackText: {
        color: "#fff",
        fontWeight: "600",
    },
    cancelBtn: {
        backgroundColor: "#fff",
        width: '40%',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: '#F9F9F9',
        borderWidth: 2
    },
    cancelText: {
        color: "#555",
        fontWeight: "600",
    },
    header1: {
        fontSize: 22,
        fontFamily: fonts.bold,
        marginBottom: 20
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        marginBottom: 20,
        padding: 10,
        marginHorizontal: 15,
        marginTop: 15
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center'
    },
    activeTab: { backgroundColor: color.primary },
    tabText: { fontSize: 14, fontWeight: '500', color: '#444', fontFamily: fonts.bold },
    activeTabText: { color: '#fff' },

});

export default OrderList;
