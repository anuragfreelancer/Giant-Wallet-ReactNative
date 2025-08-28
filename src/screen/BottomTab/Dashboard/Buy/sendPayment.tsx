import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import imageIndex from '../../../../assets/imageIndex';
import CustomButton from '../../../../compoent/CustomButton';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useNavigation } from '@react-navigation/native';

const SendPayment = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>

            <StatusBarComponent />
            <CustomHeader

                menuIcon={imageIndex.back} label="Send ETH" />

            <View style={{ marginHorizontal: 12, flex: 1 }}>
                <View style={{ marginTop: 35 }}>

                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Recipient Address"

                            style={styles.input}
                        // value={oldpass}
                        // onChangeText={setOldPass}
                        />



                    </View>
                    <View style={styles.inputContainer}>

                        <TextInput
                            placeholder="Ammount ETH"
                            style={styles.input}
                            keyboardType='number-pad'
                        />


                    </View>

                    {/* New Password */}


                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
                    <CustomButton
                        title="Send"
                        onPress={() => navigation.navigate(ScreenNameEnum.confirmPayment)}

                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },
    errorText: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5
    },

    image: { height: 22, width: 22 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F8F8',
        borderRadius: 40,
        paddingHorizontal: 10,
        marginBottom: 30,
        height: 60,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: '#ADA4A5',
    },

});

export default SendPayment;
