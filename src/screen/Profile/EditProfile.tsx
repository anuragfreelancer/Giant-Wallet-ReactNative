import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import imageIndex from "../../assets/imageIndex";
import StatusBarComponent from "../../compoent/StatusBarCompoent";
import CustomHeader from "../../compoent/CustomHeader";
import TextInputField from "../../utils/TextInputField";
import CustomButton from "../../compoent/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
// import ImagePickerModal from "../../compoent/ImagePickerModal";
import { EditProfile_Api } from "../../Api/apiRequest";
import LoadingModal from "../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePickerModal from "../../compoent/ImagePickerModal";

const EditProfile = () => {
  const isLogin = useSelector((state: any) => state?.auth);

  const [fullName, setFullName] = useState(isLogin?.userData?.fullName);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState(isLogin?.userData?.phone);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [image, setImage] = useState<any>("");
  const navigation = useNavigation()
  console.log(isLogin?.userData)
  useEffect(() => {
    setFullName(isLogin?.userData?.fullName),
      setEmail(isLogin?.userData?.email)
  }, [])

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: false,
    })
      .then((image: any) => {
        setImage(image);
        setIsModalVisible(false)
      })
      .catch((error) => console.log(error));
  };
  const takePhotoFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        // cropping: false,
      });
      setImage(image);
      setIsModalVisible(false)

    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };
  const handleSubmit = async () => {
    try {
      const params = {
        name: fullName,
        images: image,
        userId: isLogin?.userData?.id,
        token: isLogin?.token
      };
      const response = await EditProfile_Api(params, setLoading, navigation);
      // dispatch(GetUserApi(isLogin?.userData?.id));
    } catch (error) {
    }
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <StatusBarComponent />
      {isLoading ? <LoadingModal /> : null}

      <CustomHeader
        menuIcon={imageIndex.back} label="Profile" navigation={navigation} leftPress={true} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {
            image.path ?
              <Image
                source={{ uri: image.path }}
                // source={imageIndex.dummy}
                style={styles.profileImage}
                resizeMode="cover"
              /> :
              isLogin.userData.avatar ? (
                <Image
                  source={{ uri: isLogin?.userData?.avatar }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  // source={{ uri: image.path }}
                  source={imageIndex.dummy}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              )}
          <TouchableOpacity style={styles.editIcon} onPress={() => {
            setIsModalVisible(true)
          }} >
            <Image
              source={imageIndex.editSqr}
              style={{
                height: 25,
                width: 25,
                // tintColor: "white"
              }}
              resizeMode="contain"

            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 45 }}>
          <TextInputField
            placeholder={'Full Name'}
            // firstLogo={true}
            // img={imageIndex.profile}
            text={fullName}
            onChangeText={setFullName}
          />
          <TextInputField
            placeholder={'Email'}
            // firstLogo={true}
            // img={imageIndex.}
            text={email}
            onChangeText={setEmail}
            editable={false}
          />
          <TextInputField
            placeholder={'Mobile'}
            // firstLogo={true}
            // img={imageIndex.}
            text={mobile}
            onChangeText={setMobile}
            editable={false}
          />
          {/* <TextInputField
            placeholder={'DOB'}
            firstLogo={true}
            img={imageIndex.}
            text={email}
            onChangeText={setEmail}
            editable={true}
          /> */}

          {/* type */}


        </View>
        <CustomButton
          title="Update"
          onPress={() => handleSubmit()}
          style={{ marginTop: 45, width: '90%' }}
        />
      </View>
      <ImagePickerModal
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        pickImageFromGallery={pickImageFromGallery}
        takePhotoFromCamera={takePhotoFromCamera}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginHorizontal: 15
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    // borderWidth: 1,
    // borderColor: "rgba(251, 91, 43, 1)",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    // backgroundColor: "rgba(251, 91, 43, 1)",
    padding: 7,
    borderRadius: 15,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },
});

export default EditProfile;