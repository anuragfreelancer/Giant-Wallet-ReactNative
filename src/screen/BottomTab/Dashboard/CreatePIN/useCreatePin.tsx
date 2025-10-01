import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { CreateLoginPin, VerifyLoginPin } from '../../../../Api/apiRequest';
import { useSelector } from 'react-redux';
import ScreenNameEnum from '../../../../routes/screenName.enum';


export const useCreatePin = (cellCount: number = 4) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pin } = route.params || {};
  const isLogin = useSelector((state: any) => state?.auth);

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const handleChangeText = async(text: string) => {
   setValue(text);
     setErrorMessage(text.length < cellCount ? 'Please enter a 4-digit pin.' : '');
    console.log(text.length)
    
  };
  const sendConfirm = () => {
    if (value.length !== cellCount) {
      setErrorMessage('Please enter a 4-digit pin.');
      return;
    }
    navigation.navigate(ScreenNameEnum.CreatePinConfirm, { pin: value })
  }
  const handleVerifyPIN = async () => {
    if (value.length !== cellCount) {
      setErrorMessage('Please enter a 4-digit pin.');
      return;
    }
    setIsLoading(true);
    try {
      const params = { pin: pin, cpin: value, navigation, token: isLogin?.token };
      await CreateLoginPin(params, setIsLoading);
    } catch (error) {
      console.error('OTP verification error:', error);
      // setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };
  const verifyLogin=async()=>{
     if (value.length !== cellCount) {
      setErrorMessage('Please enter a 4-digit pin.');
      return;
    }
    setIsLoading(true);
    try {
      const params = { pin: value,navigation, token: isLogin?.token };
      await VerifyLoginPin(params, setIsLoading);
    } catch (error) {
      console.error('OTP verification error:', error);
      // setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
    }
  }

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyPIN,
    navigation,
    sendConfirm,
    verifyLogin
  };
};
