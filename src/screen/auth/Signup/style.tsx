import { StyleSheet } from "react-native";
import { hp, wp } from "../../../utils/Constant";
import ResponsiveSize from "../../../utils/ResponsiveSize";
import { fonts } from "../../../constant";

export const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:20
  },
 
  mainContainer: {
    flex: 1,
    // alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
  },
   txtDes:{
      color:'#9DB2BF',
      fontSize:14,
      fontFamily:fonts.regular,
      marginVertical:15
    },
  logo: {
    height: hp(10),
    width:  hp(10),
    marginVertical: 20,
  },
  txtHeading: {
    
    fontSize: 24,
    lineHeight: 36,
    color: 'rgba(0, 0, 0, 1)',
    marginTop: 7,
    fontFamily:fonts.bold
  },
  inputContainer: {
    width: '100%',
    paddingVertical: hp(2),
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
 
  signupContainer: {
    height: hp(5),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    width: wp(100),
    justifyContent: 'center',
  },
  signUpPrompt: {
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(144, 144, 144, 1)',
  },
  signupText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#909090',
    bottom: 2,
    fontFamily:fonts.medium,
  },
  orText: {
    lineHeight: 16,
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    fontWeight: '500',
  },
  googleIcon: {
    height: 30,
    width: '100%',
    marginTop: 12,
  },
  
  button: {
    backgroundColor: '#fff',
    borderRadius: 27.5,
    borderColor: '#ddd',
    borderWidth: 0,
    alignSelf: 'center',
    height:55,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily:fonts.medium,
    color: '#555',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
});
