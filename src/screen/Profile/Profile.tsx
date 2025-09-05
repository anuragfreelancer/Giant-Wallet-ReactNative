import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenNameEnum from "../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import imageIndex from "../../assets/imageIndex";
import { color, fonts } from "../../constant";
import { wp } from "../../utils/Constant";
import { logout } from "../../redux/feature/authSlice";
import { useDispatch } from "react-redux";
import LogoutModal from "../../compoent/LogoutModal";

// Sample data (use local icons/images in ./assets/)
const menuItems = [
    // { id: "1", title: "Wallet" },
    { id: "2", title: "Select Currency", screen: ScreenNameEnum.language },
    { id: "3", title: "Change Password", screen: ScreenNameEnum.changePassword },
    { id: "4", title: "Notification", screen: ScreenNameEnum.NotificationsSetting },
    { id: "5", title: "FAQ", screen: ScreenNameEnum.FAQScreen },
    { id: "6", title: "About us", screen: ScreenNameEnum.About },
    { id: "7", title: "Privacy Policy", screen: ScreenNameEnum.PrivacyPolicy },
    { id: "8", title: "Logout", },
];

const ProfileScreen = () => {
    const navigation = useNavigation()
const dispatch = useDispatch()
  const [isModalVisible, setModalVisible] = useState(false);
      const handleLogout = () => {
    dispatch(logout());
    setModalVisible(false);
    // AsyncStorage.removeItem('userRole');  // AsyncStorage में save
    navigation.replace(ScreenNameEnum.LoginScreen);
    // successToast(localizationStrings.logoutSuccess);
  };
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => item?.screen ? navigation.navigate(item.screen) :
                item?.title == "Logout" && setModalVisible(true)
            }
        >

            <Text style={styles.cardText}>{item.title}</Text>
            <Image source={imageIndex.next} style={styles.icon}
                resizeMode="contain" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            {/* <Text style={styles.header}>Profile</Text> */}

            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={imageIndex.dummy} // your local profile image
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.name}>Marcus Aminoff</Text>
                    <Text style={styles.subtitle}>Mercedes</Text>
                </View>
                <TouchableOpacity style={styles.updateBtn} onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}>
                    <Image source={imageIndex.editSqr} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>
            </View>

            {/* Menu Grid */}
            <View style={styles.listContainer}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>

             <LogoutModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          handleLogout()
        }}
      />
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
        color: "#000",
        paddingHorizontal: 16
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        paddingHorizontal: 16

        // elevation: 3,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: color.primary,
    },
    subtitle: {
        fontSize: 13,
        color: "#777",
        fontFamily: fonts.medium,

    },
    updateBtn: {
        marginLeft: "auto",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    updateText: {
        color: "#fff",
        fontFamily: fonts.medium,

    },
    listContainer: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        // elevation: 2,
    },
    flatListContent: {
        alignItems: "center",

    },
    card: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        width: wp(100) - 40,
        height: 60

    },
    icon: {
        width: 25,
        height: 25,
        // marginBottom: 8,
        tintColor: '#000'
    },
    cardText: {
        fontSize: 16,
        textAlign: "center",
        color: "#000",
        fontFamily: fonts.regular,

    },
});
