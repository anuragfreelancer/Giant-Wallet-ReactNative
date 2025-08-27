import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomTextInput from "../../../compoent/CustomTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../compoent/CustomHeader";
import imageIndex from "../../../assets/imageIndex";
import CustomButton from "../../../compoent/CustomButton";
import { wp } from "../../../utils/Constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";


const LoanForm = () => {
  const [form, setForm] = useState({
    firstName: "Avi",
    lastName: "Tanwar",
    pan: "AMPPT2345A",
    phone: "+91 9872342636",
    dob: new Date(2020, 9, 22),
    pin: "160019",
    city: "160019",
  });

  const [showDate, setShowDate] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };
const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <CustomHeader label={"Apply Loan   "+'  '} menuIcon={imageIndex.back} navigation={navigation} leftPress={()=>navigation.goBack()} rightIcons={[{icon:imageIndex.bag}]}/>
      <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView  keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <CustomTextInput
          label="First Name"
          value={form.firstName}
          onChangeText={(val) => handleChange("firstName", val)}
        />
        <CustomTextInput
          label="Last Name"
          value={form.lastName}
          onChangeText={(val) => handleChange("lastName", val)}
        />
        <CustomTextInput
          label="PAN"
          value={form.pan}
          onChangeText={(val) => handleChange("pan", val)}
        />
        <CustomTextInput
          label="Phone No"
          value={form.phone}
          keyboardType="phone-pad"
          onChangeText={(val) => handleChange("phone", val)}
        />
        <CustomTextInput
          label="DOB"
          value={form.dob.toDateString()}
          editable={false}
          showIcon
          onIconPress={() => setShowDate(true)}
        />
        {showDate && (
          <DateTimePicker
            value={form.dob}
            mode="date"
            display="default"
            onChange={(e, selectedDate) => {
              setShowDate(false);
              if (selectedDate) handleChange("dob", selectedDate);
            }}
          />
        )}
        <CustomTextInput
          label="Pin Code"
          value={form.pin}
          keyboardType="numeric"
          onChangeText={(val) => handleChange("pin", val)}
        />
        <CustomTextInput
          label="City"
          value={form.city}
          onChangeText={(val) => handleChange("city", val)}
        />
      </ScrollView>
</KeyboardAvoidingView>
    <CustomButton title="Edit" style={styles.button} onPress={()=>navigation.navigate(ScreenNameEnum.SubmittingScreen)}/>
    </SafeAreaView>
  );
};

export default LoanForm;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    width:wp(100) - 30,
    marginBottom:20
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
