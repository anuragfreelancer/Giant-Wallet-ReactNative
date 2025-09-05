import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useCreatePin } from './useCreatePin';
import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../../utils/Loader';
import CustomButton from '../../../../compoent/CustomButton';
import imageIndex from '../../../../assets/imageIndex';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { hp } from '../../../../utils/Constant';
import { useSelector } from 'react-redux';
export default function VerifyPin() {
  const {
    value,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyPIN,
    navigation,
    verifyLogin
  } = useCreatePin()

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <View style={styles.container}>
        {isLoading && <LoadingModal />}
        <StatusBarComponent />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={imageIndex.appLogo} style={styles.logo} resizeMode='contain' />

          <Text style={styles.txtHeading}>Verify Pin</Text>
          <Text style={styles.txtDes}>Please put the 4 digits Set Login Pin
          </Text>

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
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>
          <Image source={imageIndex.otp} style={{ width: '80%', height: hp(30), alignSelf: 'center', marginBottom: 30 }} />
          <CustomButton
            title={"Verify"}
            onPress={() => {
              verifyLogin()
            }}
            // onPress={handleVerifyOTP}
            style={styles.submitButton}
          />

        </ScrollView>



      </View>
    </SafeAreaView>
  );
}