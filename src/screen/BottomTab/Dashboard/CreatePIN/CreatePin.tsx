import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useCreatePin } from './useCreatePin';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../../utils/Loader';
import CustomButton from '../../../../compoent/CustomButton';
import imageIndex from '../../../../assets/imageIndex';
import ScreenNameEnum from '../../../../routes/screenName.enum';
export default function CreatePin() {
  const {
    value,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    type
  } = useCreatePin()
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}

    >
      <View style={styles.container}>
        {isLoading && <LoadingModal />}
        <StatusBarComponent />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={imageIndex.dummy} style={styles.profileImage} />
              <View>
                <Text style={styles.welcome}>Welcome</Text>
                <Text style={styles.userName}>Ashlynn Korsgaard</Text>
              </View>
            </View>
            <View style={styles.iconsRow}>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.DonationScreen)}>

                <Image source={imageIndex.donation} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Notification)}>

                <Image source={imageIndex.notification} style={styles.icon} />
                {/* <Image source={require("./assets/settings.png")} style={styles.icon} /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.headerSection}>
            <Text style={styles.txtHeading}>Create Pin</Text>
            <Text style={styles.txtDes}>Please put the 4 digits Set Login Pin
            </Text>
          </View>

          <View style={styles.otpFieldContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleChangeText}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View key={index} style={styles.cellWrapper}>
                  <Text
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {/* {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} */}
          </View>
          <CustomButton
            title={"Save"}
            onPress={() => {

            }
            }
            // onPress={handleVerifyOTP}
            style={styles.submitButton}
          />

        </ScrollView>



      </View>
    </SafeAreaView>
  );
}