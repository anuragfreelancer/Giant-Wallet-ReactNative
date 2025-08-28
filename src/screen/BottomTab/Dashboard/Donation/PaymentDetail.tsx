import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../../../constant";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../../compoent/CustomButton";
import CustomHeader from "../../../../compoent/CustomHeader";

const PaymentDetails = () => {
    const [selectedCard, setSelectedCard] = useState("hdfc");
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader label="Payment Details" menuIcon={imageIndex.back} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <ScrollView contentContainerStyle={{ padding: 20 }}>
                        {/* Header */}


                        {/* Saved Cards */}
                        <Text style={styles.sectionTitle}>Credit & Debit Cards</Text>

                        {/* Axis Bank */}
                        <TouchableOpacity
                            style={[
                                styles.cardRow,
                                selectedCard === "axis" && styles.cardSelected,
                            ]}
                            onPress={() => setSelectedCard("axis")}
                        >
                            <View style={styles.cardLogo}>
                                <Text style={{ fontWeight: "700", color: "#fff" }}>Axis</Text>
                            </View>
                            <Text style={styles.cardText}>Axis Bank **** **** **** 5393</Text>
                            <View style={[styles.radio, selectedCard === "axis" && styles.radioActive]} />
                        </TouchableOpacity>

                        {/* HDFC Bank */}
                        <TouchableOpacity
                            style={[
                                styles.cardRow,
                                selectedCard === "hdfc" && styles.cardSelected,
                            ]}
                            onPress={() => setSelectedCard("hdfc")}
                        >
                            <View style={styles.cardLogo}>
                                <Text style={{ fontWeight: "700", color: "#fff" }}>VISA</Text>
                            </View>
                            <Text style={styles.cardText}>HDFC Bank **** **** **** 6246</Text>
                            <View style={[styles.radio, selectedCard === "hdfc" && styles.radioActive]} />
                        </TouchableOpacity>

                        {/* Add Card */}
                        <TouchableOpacity style={styles.addCardRow}>
                            <View style={styles.addIcon}>
                                <Text style={{ fontSize: 18, color: "#fff" }}>+</Text>
                            </View>
                            <Text style={styles.cardText}>Add New Card</Text>
                        </TouchableOpacity>

                        {/* Card Number */}
                        <Text style={styles.sectionTitle}>Card Number</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Enter 12 digit card number"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />

                        {/* Expiry & CVV */}
                        <View style={styles.row}>
                            <View style={{ flex: 0.6 }}>
                                <Text style={styles.sectionTitle}>Valid Thru</Text>
                                <View style={{ flexDirection: 'row', }}>
                                    <TextInput
                                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                                        placeholder="Month"
                                        placeholderTextColor="#999"
                                    />
                                    <TextInput
                                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                                        placeholder="Year"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 0.4 }}>
                                <Text style={styles.sectionTitle}>CVV</Text>

                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    placeholder="CVV"
                                    keyboardType="numeric"
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>

                        {/* Cardholder Name */}
                        <TextInput
                            style={[styles.input, { marginTop: 10 }]}
                            placeholder="Name on Card"
                            placeholderTextColor="#999"
                        />

                        {/* Pay Now Button */}
                        <TouchableOpacity style={styles.payBtn}>
                            <Text style={styles.payText}>Pay Now</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 35 },
    backBtn: {
        marginRight: 10,
    },
    backText: { fontSize: 18, fontWeight: "600" },
    headerTitle: { fontSize: 18, fontFamily: fonts.bold, color: "#000", textAlign: 'center', flex: 1, marginRight: 40 },

    sectionTitle: { fontSize: 16, fontFamily: fonts.bold, marginBottom: 10 },

    cardRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#b3b3b3',
        marginTop: 10
    },
    cardSelected: { borderWidth: 2, borderColor: "#E53935" },
    cardLogo: {
        width: 50,
        height: 30,
        backgroundColor: "#E53935",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    cardText: { flex: 1, fontSize: 14, color: "#333", fontFamily: fonts.medium },
    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#888",
    },
    radioActive: { backgroundColor: "#E53935", borderColor: "#E53935" },

    addCardRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#f7f7f7",
        marginBottom: 20,
        marginTop: 10
    },
    addIcon: {
        width: 30,
        height: 30,
        backgroundColor: "#000",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 12,
        fontSize: 14,
        marginBottom: 15,
        color: "#000",
    },
    row: { flexDirection: "row", justifyContent: "space-between" },

    payBtn: {
        backgroundColor: "#E53935",
        padding: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 10,
    },
    payText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

export default PaymentDetails;
