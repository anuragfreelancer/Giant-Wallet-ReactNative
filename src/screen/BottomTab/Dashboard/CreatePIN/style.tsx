import { StyleSheet } from "react-native";
import { color, fonts } from "../../../../constant";
import { hp, wp } from "../../../../utils/Constant";


export const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FFF',
    paddingHorizontal: 15,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 15,

  },
  backButton: {
    marginTop: 8,
    width: '15%',
  },
  backIcon: {
    height: 32,
    width: 32,
  },
   txtHeading: {
    fontFamily:fonts.bold,
    fontSize: 24,
    lineHeight: 36,
    color: 'rgba(0, 0, 0, 1)',
    marginTop: 55,
    textAlign:'center'
  },
   txtDes:{
        color:'#9DB2BF',
        fontSize:14,
        fontFamily:fonts.regular,
        marginTop:15,
        textAlign:'center'
      },
  headerSection: {
    height: hp(15),
    marginTop: 5,
    // alignItems:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
    lineHeight: 36,
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(157, 178, 191, 1)',
    lineHeight: 24,
    marginTop: 10,
  },
  otpFieldContainer: {
    height: hp(10),
    marginHorizontal: 18,
    marginTop: 20,
    justifyContent: 'center',
    width:wp(75),
    alignSelf:'center'
  },
  cellWrapper: {
    marginStart: -1,
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
  },
  cell: {
    width: 55,
    height: 55,
    fontSize: 24,
    lineHeight: 38,
    borderWidth: 1.5,
    borderColor: '#E9E9E9',
    textAlign: 'center',
    color: '#000',
    borderRadius: 10,
    backgroundColor: '#E9E9E9',
    textAlignVertical: 'center',
  },
  focusCell: {
    borderColor: color.primary,
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 18,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(30),
    marginTop: 30,
  },
  bannerImage: {
    height: '100%',
    width: '100%',
  },
  submitButton: {
    width: '100%',
    alignSelf:'center',
    marginTop:25
  },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  userName: { fontSize: 14, color: "#666" , fontFamily:fonts.regular,},
  welcome: { fontSize: 16, fontFamily:fonts.bold, color: "#000" },
  iconsRow: { flexDirection: "row" },
  icon: { width: 40, height: 40, marginLeft: 12 },

});
