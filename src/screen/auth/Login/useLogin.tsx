import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegistrationStackParamList } from '../../../navigators/RegistrationRoutes';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { LoginCustomer, LoginWithGoogleCustomer } from '../../../Api/apiRequest';
import localizationStrings from '../../../localization/LocalizationString';
// import messaging, { getToken } from '@react-native-firebase/messaging';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";


type UserType = 'User' | 'Driver';

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<UserType>('User');
const [token, setToken] = useState('')
  const navigation = useNavigation<NativeStackNavigationProp<RegistrationStackParamList>>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      const userType = await AsyncStorage.getItem('userType');
      setType(userType === 'Driver' ? 'Driver' : 'User');
      // await getFcmToken()
    })();
  }, []);
//  const getFcmToken = async () => {
//     const token = await messaging().getToken();
//     setToken(token)
//     console.log('FCM Token:', token);
//     // 🔥 Send this token to your backend or Firestore if needed
//   };
 
  const handleEmailChange = (value: string) => {
  setEmail(value.trim());
  const error = validateEmail(value);
  setEmailError(error);
};
  useEffect(() => {
    GoogleSignin.configure({
      // webClientId: "900661195494-l0drrhjcu3hjr83dt0tn39e04133om5p.apps.googleusercontent.com", // from Google console
      webClientId: "774326873162-k28vb28j2recknlhdntvm60h3gf2n9h8.apps.googleusercontent.com", // from Google console
      offlineAccess: true,
    });
  }, []);

  const GoogleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);
      if(userInfo?.type == 'success'){
         const params = {
        // email,
        // password,
        // roleType: role,
        navigation,
        gtoken:userInfo?.data?.idToken,
      };
      await LoginWithGoogleCustomer(params, setLoading, dispatch);

      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signin in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available");
      } else {
        console.log("Error:", error);
      }
    }
  };

const handlePasswordChange = (value: string) => {
  setPassword(value);
  const error = validatePassword(value);
  setPasswordError(error);
};

const handleLogin = async () => {
    const role = await AsyncStorage.getItem('userType');
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === '') return setEmailError(localizationStrings.emailRequired);
    if (validateEmail(trimmedEmail)) return setEmailError(localizationStrings.inValidEmail);
    if (trimmedPassword === '') return setPasswordError(localizationStrings.passRequire);
    if (trimmedPassword.length < 6) return setPasswordError(localizationStrings.inValidPass);
    try {
      const params = {
        email,
        password,
        // roleType: role,
        navigation,
        token,
      };
      await LoginCustomer(params, setLoading, dispatch);
    } catch (error) {
      // console.error("Login error:", error);
    }
  };
  return {
    email,
    password,
    emailError,
    passwordError,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
    navigation,
    type,
    GoogleAuth
  };
}
