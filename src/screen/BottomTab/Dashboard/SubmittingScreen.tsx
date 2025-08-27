import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, Animated, Easing } from "react-native";
import imageIndex from "../../../assets/imageIndex";
import CustomBackHeader from "../../../compoent/CustomBackHeader";
import { SafeAreaView } from "react-native-safe-area-context";

const SubmittingScreen = () => {
   const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Map rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // full rotation
  });

  return (
    <SafeAreaView style={styles.container}>
      <CustomBackHeader menuIcon={imageIndex.back}/>
      {/* Local image (place hourglass.png inside assets folder) */}
      <View style={{flex:1, alignItems:'center', justifyContent:'center', marginBottom:150}}>
        <Animated.Image
 style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
     

        source={imageIndex.reward}
       />

      <Text style={styles.title}>Submitting...</Text>
      <Text style={styles.subtitle}>
        Please wait while we verify your details.
      </Text>
</View>
      {/* Optional loader spinner */}
      {/* <ActivityIndicator size="large" color="#f4b400" style={{ marginTop: 20 }} /> */}
    </SafeAreaView>
  );
};

export default SubmittingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginHorizontal: 20,
  },
});
