
import React, { useEffect, useState } from 'react'
import {
    Image, ScrollView, View,
    StyleSheet,
    useWindowDimensions,
    Text
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../../utils/Loader';
import imageIndex from '../../assets/imageIndex'
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomHeader from '../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { Policies_Api } from '../../Api/apiRequest';
import { hp } from '../../utils/Constant';
const PrivacyPolicy = () => {
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()
    const [faqData, setFaqData] = useState([])
    useEffect(() => {
        // get_states_list()
    }, []);


    // const get_states_list = async () => {
    // try {
    //     const state = await Policies_Api(setLoading);
    //     if (state) {
    //         setFaqData(state?.result);  // `result` ke andar `description` hai
    //     }
    // } catch (error) {
    //     setFaqData([]);
    // }
    // };

    const { width } = useWindowDimensions();

    return (
        <SafeAreaView style={[styles.container, {
        }]}>
            {isLoading ? <Loading /> : null}
            <StatusBarComponent />
            <CustomHeader


                leftPress={true}
                navigation={navigation}
                menuIcon={imageIndex.back}
                label="Privacy Policy" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.illustrationWrapper}>
                    <Image
                        source={imageIndex.aboutus}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ color: "black", fontWeight: "800", fontSize: 18 }}>Privacy Policy</Text>
                    <Text>This Privacy Policy describes Our policies and procedures on the
                        collection, use and disclosure of Your information when You use the
                        Service and tells You about Your privacy rights and how the law protects
                        You.We use Your Personal data to provide and improve the Service.
                        By using the Service, You agree to the collection and use of information
                        in accordance with this Privacy Policy.
                        This Privacy Policy has been created with the help of the</Text>


                    <Text style={{ color: "black", fontWeight: "800", fontSize: 18, marginTop: 40 }}>Terms of Use</Text>
                    <Text>This Privacy Policy describes Our policies and procedures on the
                        collection, use and disclosure of Your information when You use the
                        Service and tells You about Your privacy rights and how the law protects
                        You.We use Your Personal data to provide and improve the Service.
                        By using the Service, You agree to the collection and use of information
                        in accordance with this Privacy Policy.
                        This Privacy Policy has been created with the help of the</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({     
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        padding: 12,
    },
    illustrationWrapper: {
        alignItems: 'center',
        // marginBottom: 16,
    },
    illustration: {
        width: '80%',
        height: hp(30),
    },
  

});

export default PrivacyPolicy