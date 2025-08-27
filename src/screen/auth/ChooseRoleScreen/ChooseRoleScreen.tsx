import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../compoent/Icon';
import { color } from '../../../constant';
import CustomButton from '../../../compoent/CustomButton';
import localizationStrings from '../../../localization/LocalizationString';
import { styles } from './style';

const ChooseRoleScreen = ({ navigation }: any) => {
    return (
        <ImageBackground
            source={imageIndex.AuthBg}
            style={{ flex: 1 }}
            resizeMode='stretch'
        >
            <StatusBarComponent translucent={true} backgroundColor='transparent' />

            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={imageIndex.LogoCircle} style={styles.logoCircle} />

                </View>

                <Text style={styles.title}>{localizationStrings?.selectTxt}</Text>
                <Text style={styles.subtitle}>
                    {localizationStrings?.selectDes}
                </Text>

                <View style={styles.buttonsContainer}>

                    <CustomButton
                        title={localizationStrings?.regular}
                        alignItm="left"
                        height={90}
                        style={{ justifyContent: 'flex-start' }}
                        textStyle={{ fontSize: 24 }}
                        leftIcon={<Icon source={imageIndex.persons} size={40} colorIcon="#fff" />}
                        onPress={async () => {
                            await AsyncStorage.setItem('userType', "User")
                            navigation.navigate(ScreenNameEnum.LoginScreen, { type: "User" })
                        }
                        }
                    />

                    <CustomButton
                        title={localizationStrings?.driver}
                        bgColor="#fff"
                        txtcolor={'black'}
                        alignItm="left"
                        textStyle={{ fontSize: 24 }}
                        leftIcon={<Icon source={imageIndex.user} size={40} colorIcon={color.primary} />}
                        height={90}
                        style={{ marginTop: 15, borderWidth: 1, borderColor: '#0A7F7F', }}
                        onPress={async () => {
                            await AsyncStorage.setItem('userType', "Driver")

                            navigation.navigate(ScreenNameEnum.LoginScreen, { type: "Driver" })
                        }

                        }
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};
export default ChooseRoleScreen;
