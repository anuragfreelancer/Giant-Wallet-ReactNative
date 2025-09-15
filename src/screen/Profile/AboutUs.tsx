import React, { useEffect, useState } from 'react';
import {
    Image, ScrollView, View,
    StyleSheet,
    useWindowDimensions,
    Text,
    Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../assets/imageIndex';
import StatusBarComponent from '../../compoent/StatusBarCompoent';
import CustomHeader from '../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { hp } from '../../utils/Constant';
import LoadingModal from '../../utils/Loader';


const AboutUs = () => {
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    useEffect(() => {
        setLoading(false)
    }, [])
    const openExternalLink = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <LoadingModal /> : null}
            <StatusBarComponent />
            <CustomHeader
                leftPress={true}
                navigation={navigation}
                menuIcon={imageIndex.back}
                label="About Giant Wallet"
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.illustrationWrapper}>
                    <Image
                        source={imageIndex.aboutus}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.contentWrapper}>
                    <Text style={styles.heading}>Welcome to Giant Wallet</Text>
                    <Text style={styles.paragraph}>
                        Giant Wallet is a revolutionary cryptocurrency application designed to facilitate charitable donations and empower communities through the power of blockchain technology. Our mission is to make giving easier, more transparent, and more impactful using the GTAN token ecosystem.
                    </Text>

                    <Text style={styles.subHeading}>Our Vision</Text>
                    <Text style={styles.paragraph}>
                        We envision a world where charitable giving is seamless, transparent, and accessible to everyone. By leveraging blockchain technology, we're creating a platform where donors can track their contributions and see the real-world impact of their generosity.
                    </Text>

                    <Text style={styles.subHeading}>What We Offer</Text>

                    <View style={styles.featureCard}>
                        {/* <Icon name="currency-exchange" size={24} color="#2A6FFC" style={styles.featureIcon} /> */}
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Token Conversion</Text>
                            <Text style={styles.featureDescription}>
                                Easily convert between GTAN and other major cryptocurrencies with low fees and instant processing.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        {/* <Icon name="account-balance" size={24} color="#2A6FFC" style={styles.featureIcon} /> */}
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Buy & Sell</Text>
                            <Text style={styles.featureDescription}>
                                Securely purchase and sell GTAN tokens through our integrated exchange partners.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        {/* <Icon name="send" size={24} color="#2A6FFC" style={styles.featureIcon} /> */}
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Send & Receive</Text>
                            <Text style={styles.featureDescription}>
                                Instantly send and receive GTAN tokens to anyone around the world with minimal transaction fees.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.featureCard}>
                        {/* <Icon name="favorite" size={24} color="#2A6FFC" style={styles.featureIcon} /> */}
                        <View style={styles.featureTextContainer}>
                            <Text style={styles.featureTitle}>Charity & Donations</Text>
                            <Text style={styles.featureDescription}>
                                Support verified charitable organizations directly through our platform with transparent tracking of how your donations are used.
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.subHeading}>The GTAN Token</Text>
                    <Text style={styles.paragraph}>
                        GTAN (Giant Token) is the native cryptocurrency of our ecosystem, designed specifically to facilitate charitable giving while providing utility value to holders. A portion of every transaction fee is allocated to our charity fund, meaning your everyday transactions contribute to meaningful causes.
                    </Text>

                    <Text style={styles.subHeading}>Our Commitment to Transparency</Text>
                    <Text style={styles.paragraph}>
                        We believe transparency is crucial in charitable work. That's why all donations made through Giant Wallet are recorded on the blockchain, providing an immutable record of how funds are allocated and used by recipient organizations.
                    </Text>

                    <Text style={styles.subHeading}>Security First</Text>
                    <Text style={styles.paragraph}>
                        Your security is our top priority. We employ industry-leading encryption, multi-factor authentication, and cold storage solutions to ensure your GTAN tokens and personal information remain safe.
                    </Text>

                    <Text style={styles.subHeading}>Join Our Mission</Text>
                    <Text style={styles.paragraph}>
                        By using Giant Wallet, you're not just managing cryptocurrency - you're participating in a movement to make charitable giving more effective and transparent. Together, we can create massive positive change in communities around the world.
                    </Text>

                    <Text style={styles.contactText}>
                        For more information, visit our website at{' '}
                        <Text
                            style={styles.link}
                            onPress={() => openExternalLink('https://giantwallet.com')}
                        >
                            giantwallet.com
                        </Text>
                    </Text>

                    <Text style={styles.footer}>
                        © {new Date().getFullYear()} Giant Wallet. All rights reserved.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        paddingBottom: 30,
    },
    illustrationWrapper: {
        alignItems: 'center',
        marginBottom: 10,
    },
    illustration: {
        width: '80%',
        height: hp(25),
    },
    contentWrapper: {
        paddingHorizontal: 20,
    },
    heading: {
        color: '#2A6FFC',
        fontWeight: '800',
        fontSize: 22,
        marginBottom: 15,
        textAlign: 'center',
    },
    subHeading: {
        color: '#2A6FFC',
        fontWeight: '700',
        fontSize: 18,
        marginTop: 25,
        marginBottom: 10,
    },
    paragraph: {
        color: '#333',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 15,
        textAlign: 'justify',
    },
    featureCard: {
        flexDirection: 'row',
        backgroundColor: '#F7F9FC',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    featureIcon: {
        marginRight: 15,
    },
    featureTextContainer: {
        flex: 1,
    },
    featureTitle: {
        color: '#2A6FFC',
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 5,
    },
    featureDescription: {
        color: '#555',
        fontSize: 14,
        lineHeight: 20,
    },
    contactText: {
        color: '#333',
        fontSize: 15,
        lineHeight: 22,
        marginTop: 25,
        textAlign: 'center',
    },
    link: {
        color: '#2A6FFC',
        fontWeight: '600',
    },
    footer: {
        color: '#888',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 30,
    },
});

export default AboutUs;