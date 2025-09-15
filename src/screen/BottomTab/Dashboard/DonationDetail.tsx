import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import { fonts } from "../../../constant";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import CustomButton from "../../../compoent/CustomButton";
import DonateModal from "./Donation/DonationModal";

const DonationDetailScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation()
    const route = useRoute();
    const item = route.params?.item;
    console.log('item', item)
    const handleDonate = (amount: any) => {
        console.log("Donated Amount:", amount);
        navigation.navigate(ScreenNameEnum.PaymentDetails)
        // You can call API here
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Image source={imageIndex.back} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>

                {/* Title & Subtitle */}
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>by {item?.foundationName}</Text>

                {/* Banner Image */}
                <Image source={{uri:item?.image}} style={styles.bannerImage} />
                {/* About Section */}
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>
                    {item?.description}
                </Text>

                {/* Participants */}
                <Text style={styles.sectionTitle}>Participants</Text>
<View style={styles.participantRow}>
  {item?.participants.slice(0, 3).map((imgSrc: { avatar: string; }, index: React.Key | null | undefined) => (
    <Image
      key={index}
      source={{ uri: encodeURI(imgSrc.avatar) }}
      style={styles.participantImg}
    />
  ))}

  {item?.participants.length > 3 && (
    <View style={styles.moreCircle}>
      <Text style={styles.moreText}>
        +{item?.participants.length - 3}
      </Text>
    </View>
  )}
</View>

                {/* Buttons */}
                <CustomButton title="Donate Now" style={{ marginTop: 20 }} onPress={() => setModalVisible(true)} />

                <TouchableOpacity style={styles.groupBtn} >
                    <Text style={styles.groupBtnText}>Request Now For Group</Text>
                </TouchableOpacity>

                <DonateModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onDonate={handleDonate}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DonationDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
    },
    backBtn: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        color: "#000",
        fontFamily: fonts.bold,
        marginTop: 20
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10,
        fontFamily: fonts.regular
    },
    bannerImage: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: fonts.bold,
        marginTop: 10,
        marginBottom: 5,
    },
    aboutText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 20,
        fontFamily: fonts.regular
    },
    participantRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    participantImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: -10,
        borderWidth: 2,
        borderColor: "#f2f2f2",
    },
    moreCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
    },
    moreText: {
        color: "#fff",
        fontWeight: "600",
    },
    donateBtn: {
        backgroundColor: "red",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 20,
    },
    donateBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    groupBtn: {
        backgroundColor: "#f5f5f5",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
    },
    groupBtnText: {
        color: "#000",
        fontSize: 15,
        fontWeight: "500",
    },
});
