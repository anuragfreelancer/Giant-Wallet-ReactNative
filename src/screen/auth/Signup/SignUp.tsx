import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import TextInputField from '../../../utils/TextInputField';
import Loading from '../../../utils/Loader';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import ResponsiveSize from '../../../utils/ResponsiveSize';
import { wp } from '../../../utils/Constant';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCustomer } from '../../../Api/apiRequest';
import { useDispatch } from 'react-redux';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';
import { color } from '../../../constant';
import useSignup from './useSignup';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {


  const {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignup,
    navigation,
    checked,
    setChecked,
    type,
    fname,
    lName,
    fnameError,
    lNameError,
    handlefNameChange,
    handleLNameChange,
    phone,
    phoneError,
    handlePhoneChange
  } = useSignup();
  return (
    <SafeAreaView
      style={styles.bgContainer}
    >
      {loading && <Loading />}

      <StatusBarCompoent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginLeft: 15 }}>
              {/* <CustomBackHeader menuIcon={imageIndex.back} label={""} /> */}
            </View>
            <View style={styles.mainContainer}>
              <Image source={imageIndex.appLogo} style={styles.logo} resizeMode='contain' />

              <Text style={styles.txtHeading}>Sign Up</Text>
              <Text style={styles.txtDes}>Let's get started by creating your account</Text>

              <View style={styles.inputContainer}>

                <CustomInput
                  placeholder={"Full Name"}
                  leftIcon={<Icon source={imageIndex.user} size={20} />}
                value={fname}
                onChangeText={handlefNameChange}
                />
                {fnameError ? <Text style={styles.errorText}>{fnameError}</Text> : null}
                <CustomInput
                  placeholder={"Email Address"}
                  leftIcon={<Icon source={imageIndex.email} size={18} />}
                 value={email}
                keyboardType='email-address'

                onChangeText={handleEmailChange}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                <CustomInput
                  placeholder={"Phone Number"}
                  leftIcon={<Icon source={imageIndex.phone} size={18} />}
                  value={phone}
                  onChangeText={handlePhoneChange}
                  keyboardType='phone-pad'
                />
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

                <CustomInput

                  placeholder={"Password"}
                  secureTextEntryToggle
                  leftIcon={<Icon source={imageIndex.lock} size={20} />}
                value={password}
                onChangeText={handlePasswordChange}
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


              </View>
              <View style={{ width: '100%', marginBottom: 20, flexDirection: 'row', }}>
                <Image source={imageIndex.check} style={{ height: 22, width: 22, }} />
                <Text style={[styles.signupText, { textAlignVertical: 'center', lineHeight: 30 }]}>
                  {" "} I agree to the Barber  <Text style={{ color: color.primary }}>Terms of Service </Text> and
                  <Text style={{ color: color.primary }}> Privacy Policy </Text> </Text>
              </View>

              <CustomButton
                title={"Sign Up"}
                onPress={handleSignup}
                // onPress={() => navigation.navigate(ScreenNameEnum.OtpScreen, {from:'signup', })}
              />
              <TouchableOpacity style={{ alignItems: 'center', marginTop:15 }} onPress={() => navigation.navigate(ScreenNameEnum.LoginScreen)}>
                <Text style={styles.signupText}>Alrady have an account? <Text style={{ color: color.primary }}> Login</Text> </Text>
              </TouchableOpacity>

            </View>

          </ScrollView>

        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
