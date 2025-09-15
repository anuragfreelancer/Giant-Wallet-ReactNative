// ConfirmSwapScreen.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import CustomHeader from "../../../../compoent/CustomHeader";
import imageIndex from "../../../../assets/imageIndex";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../../compoent/CustomButton";
import { color, fonts } from "../../../../constant";
import { wp } from "../../../../utils/Constant";


export default function ConfirmSwapScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <CustomHeader label={"Confirm"} menuIcon={imageIndex.back} />

            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                paddingHorizontal: 20, marginTop: 20

            }}>

                {/* Confirmation Card */}
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={imageIndex.send} style={{ height: 40, width: 40, marginRight: 10 }} />
                        <Text style={{ fontFamily: fonts.bold, fontSize: 20 }}>0.0001 ETH <Text style={{ fontSize: 14, fontFamily: fonts.medium }}>($0.01)</Text> </Text>
                    </View>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>From
                            </Text>
                            <Text style={styles.label}>
                                Mario Wallet (0x9045043808...6bF7e81Fe378)
                            </Text>
                        </View>

                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>To {`\n`} Mario Wallet (0x9045043808...6bF7e81Fe378)</Text>
                    </View>



                    <View style={[styles.row]}>
                        <Text style={styles.label}>
                            <Text style={styles.highlight}>Network Fee</Text>
                        </Text>
                        <Text style={styles.value}>0.000193 ETH ($0.02)</Text>
                    </View>

                    <View style={[styles.row, { borderBottomWidth: 0 }]}>
                        <Text style={styles.label}>
                            <Text style={styles.highlight}>Max Total</Text>
                        </Text>
                        <Text style={styles.value}>3.0</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Swap Button */}
            <CustomButton title="Confirm" style={styles.swapButton}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,

        color: "#000",
        fontFamily: fonts.bold
    },
    card: {
        backgroundColor: "#FFE9E9",
        borderRadius: 12,
        paddingVertical: 16,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#FFB4B4'

    },
    label: {
        fontSize: 14,
        color: "#111827",
        fontFamily: fonts.medium,
    },
    value: {
        fontSize: 14,
        fontFamily: fonts.semiBold,
        color: "#000",
        textAlign: 'right'
    },
    highlight: {
        color: color.primary,
        fontFamily: fonts.bold,
    },
    swapButton: {
        width: wp(100) - 40,
        alignSelf: 'center',
        marginBottom: 20
    },
    swapText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
