import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { otp_Verify } from '../../../Api/apiRequest';
import ScreenNameEnum from '../../../routes/screenName.enum';

export const useOtpVerification = (cellCount: number = 4) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { from } = route.params || {};
  const { email } = route.params || {};

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const handleChangeText = (text: string) => {
    setValue(text);
    setErrorMessage(text.length < cellCount ? 'Please enter a 4-digit code.' : '');
  };

  const handleVerifyOTP = async () => {
    if (value.length !== cellCount) {
      setErrorMessage('Please enter a 4-digit code.');
      return;
    }

    setIsLoading(true);
    try {
      const params = { email, otp: value, navigation, from:from, };
      await otp_Verify(params, setIsLoading);
    
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrorMessage('An error has occurred. Please try again.');
    }
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    from
  };
};
