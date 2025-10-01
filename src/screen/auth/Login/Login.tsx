import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import CustomInput from '../../../compoent/CustomInput';
import Icon from '../../../compoent/Icon';
import localizationStrings from '../../../localization/LocalizationString';
import useLogin from './useLogin';
import { styles } from './style';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../constant';

export default function Login() {
  const {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    navigation,
    handleLogin,
    GoogleAuth
  } = useLogin();
  return (
    <SafeAreaView
      style={styles.bgContainer}
    >
      <StatusBarComponent translucent={true} backgroundColor='transparent' />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <Loading />}
        <View style={styles.mainContainer}>
          <Image source={imageIndex.appLogo} style={styles.logo} resizeMode='contain' />
          <Text style={styles.txtHeading}>Login</Text>
          <Text style={styles.txtDes}>Enter your email and password</Text>
          <View style={styles.inputContainer}>
            <CustomInput
              placeholder={"Email Address"}
              leftIcon={<Icon source={imageIndex.email} size={20} />}
              value={email}
              onChangeText={handleEmailChange}
              keyboardType='email-address'
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <CustomInput
              placeholder={'Password'}
              secureTextEntryToggle
              leftIcon={<Icon source={imageIndex.lock} size={20} />}
              value={password}
              onChangeText={handlePasswordChange}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity
              onPress={() => navigation.navigate(ScreenNameEnum.PasswordReset)}
              style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton
            title={"Login"}
            // onPress={() => navigation.navigate(ScreenNameEnum.BottomTabs)}
            // onPress={() => navigation.navigate(ScreenNameEnum.CreatePin)}
          onPress={handleLogin}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signUpPrompt}></Text>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.SignUpScreen)}>
              <Text style={styles.signupText}>Don't have an account?<Text style={{ color: color.primary }}> Sign Up</Text> </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={GoogleAuth}>
            <View style={styles.inner}>
              <Image
                source={imageIndex.google} // <-- add your Google icon here
                style={styles.icon}
              />
              <Text style={styles.text}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

