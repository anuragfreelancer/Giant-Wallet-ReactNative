import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, ImageBackground } from 'react-native';
import React from 'react';
import Loading from '../../../utils/Loader';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomButton from '../../../compoent/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import localizationStrings from '../../../localization/LocalizationString';
import { styles } from './style';
import { usePasswordReset } from './usePasswordReset';
import CustomBackHeader from '../../../compoent/CustomBackHeader';
import { hp } from '../../../utils/Constant';

export default function PasswordReset() {
   const {
    email,
    phone,
    emailError,
    loading,
    handleIdentityText,
    setPhone,
    passFunction,
    navigation
  } = usePasswordReset();
  return (
  
      <SafeAreaView style={styles.container}>
        <StatusBarComponent />
     
          {loading && <Loading />}

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
              <CustomBackHeader menuIcon={imageIndex.back} label={""} /> 
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Password Reset</Text>
                <Text style={styles.descriptionText}>Please put your mobile number to reset your password</Text>
              </View>
            </View>
            {/* <View style={styles.buttonContainer}>
              <View style={styles.bottomButton}>
                <Image source={imageIndex.sms} style={styles.buttonImage} />
                <View style={styles.inputContainer}>
                  <Text style={styles.buttonText}>SMS</Text>
                  <TextInput
                    placeholder='+91-9191919191'
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor='rgba(173, 164, 165, 1)'
                    style={styles.textInput}
                    keyboardType='phone-pad'
                  />
                </View>
              </View>
            </View> */}
             <View style={styles.buttonContainer}>
              <View style={styles.bottomButton}>
                <Image source={imageIndex.mailCircle} style={styles.buttonImage} />
                <View style={styles.inputContainer}>
                  <Text style={styles.buttonText}>Email</Text>
                  <TextInput
                    placeholder='emample@gmail.com'
                    value={email}
                    onChangeText={handleIdentityText}
                    placeholderTextColor='rgba(173, 164, 165, 1)'
                    style={styles.textInput}
                    keyboardType='email-address'
                  />
                </View>
              </View>
            </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            
  <Image source={imageIndex.smsImg} style={{width:'80%', height:hp(28), alignSelf:'center', marginTop:30}}/>

          </ScrollView>

          <CustomButton title={"Send"} onPress={passFunction} style={{marginBottom:20}} />
        
      </SafeAreaView>
  );
}
