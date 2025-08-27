import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from './Icon';
import imageIndex from '../assets/imageIndex';
import CustomButton from './CustomButton';
import localizationStrings from '../localization/LocalizationString';
import ScreenNameEnum from '../routes/screenName.enum';

const BillingCard = ({ item, type, navigation }:any) => {
  return (
    <View style={styles.card}>
      {/* Header with profile and status */}
      <View style={styles.header}>
        <Image source={imageIndex.profile} style={{height:70, width:70, borderRadius:35}} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: item.statusColor }]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      {/* Info rows */}
      <View style={styles.rowC}>
      <View style={styles.row}>
        <Icon source={imageIndex.calendar3} colorIcon="grey" size={25} />
        <Text style={styles.infoText}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <Icon source={imageIndex.calendar3} colorIcon="grey" size={25} />
        <Text style={styles.infoText}>{item.time}</Text>
      </View>
      </View>
       <View style={styles.rowC}>
      <View style={styles.row}>
        <Icon source={imageIndex.car} size={25} colorIcon="grey" />
        <Text style={styles.infoText}>{item.person}</Text>
      </View>
      <View style={styles.row}>
        <Icon source={imageIndex.userIcon} size={25} colorIcon="grey" />
      </View>
      </View>

      {/* Action button */}
      <CustomButton onPress={()=>{
        if(type=="recu" || type == "All"){
        navigation.navigate(ScreenNameEnum.RaceDetail)
        }
      }} style={styles.button} title={type=="recu"? localizationStrings.repeate: type == "menq"?"Relancer": localizationStrings.cv} height={40}/>
    
    </View>
  );
};
export default BillingCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
    flex:1

  },
  rowC: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent:'space-between',
    marginTop: 6,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: 'grey',
  },
  button: {
    marginTop:20
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  }
});
