import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import imageIndex from '../assets/imageIndex';
import CustomButton from './CustomButton';
import { color, fonts } from '../constant';

const OrderPlacedModal = ({ visible, onClose, onViewStatus, onDownloadInvoice }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={()=>onClose()}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconCircle}>
            <Image
              source={imageIndex.orderCart} // Update this path
              style={styles.icon}
            />
          </View>
          <Text style={styles.title}>Order Place Successfully</Text>
          <Text style={styles.subtitle}>You have successfully made order</Text>

          {/* <TouchableOpacity style={styles.button} onPress={onViewStatus}>
            <Text style={styles.buttonText}>View Order Status</Text>
          </TouchableOpacity> */}
<CustomButton title='View Order Status' onPress={onViewStatus}/>
          <TouchableOpacity onPress={onDownloadInvoice}>
            <Text style={styles.linkText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OrderPlacedModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    padding: 24,
    elevation: 10,
  },
  iconCircle: {
    // backgroundColor: '#FFA500',
    // borderRadius: 50,
    // padding: 16,
    marginBottom: 16,
  },
  icon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    color:"black",
    textAlign: 'center',
    marginBottom: 6,
    fontFamily:fonts.bold,

  },
  subtitle: {
    fontSize: 14,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily:fonts.medium,

  },
 
  linkText: {
    color: color.primary,
    fontFamily:fonts.medium,
    fontSize: 14,
    textAlign: 'center',
    marginTop:20
  },
});
