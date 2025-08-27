import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../compoent/CustomHeader'
import imageIndex from '../../assets/imageIndex'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notification = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex:1}}>
         <CustomHeader
        menuIcon={imageIndex.back} label="Notification      " navigation={navigation} leftPress={true} />
 
      {/* <Text>Notification</Text> */}
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({})