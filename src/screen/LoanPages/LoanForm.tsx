import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormScreen = () => {
  const [form, setForm] = useState({
    firstName: 'Avi',
    lastName: 'Tanwar',
    pan: 'AMPPT2345A',
    phone: '+91 9872342636',
    dob: new Date('2020-10-22'),
    pin: '160019',
    city: '160019',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dob', selectedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[
        { label: 'First Name', key: 'firstName' },
        { label: 'Last Name', key: 'lastName' },
        { label: 'PAN', key: 'pan' },
        { label: 'Phone No', key: 'phone' },
      ].map((field) => (
        <View style={styles.inputGroup} key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={form[field.key]}
            onChangeText={(val) => handleChange(field.key, val)}
          />
        </View>
      ))}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>DOB</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, styles.dateInput]}>
          <Text style={styles.dateText}>
            {form.dob.toDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={form.dob}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pin Code</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          value={form.pin}
          onChangeText={(val) => handleChange('pin', val)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={form.city}
          onChangeText={(val) => handleChange('city', val)}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FormScreen;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    fontSize: 12,
    color: '#999',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: '#fdfdfd',
  },
  dateInput: {
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#FFA500',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
