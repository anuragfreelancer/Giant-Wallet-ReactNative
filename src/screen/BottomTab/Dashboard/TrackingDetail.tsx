import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";

const images = [
  imageIndex.l1,
  imageIndex.l2,
  imageIndex.l3,
 imageIndex.l4,
  imageIndex.l1,
];

export default function DonationTrackingDetail() {
    const navigation = useNavigation()
  return (
     <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.heroContainer}>
          <Image source={images[0]} style={styles.heroImage} />
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.goBack()}>
                     <Image source={imageIndex.back} style={{height:30, width:30}}/>
             
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>⤴</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Child and youth care for donations – 2024
          </Text>
          <Text style={styles.byText}>by Smile Foundation</Text>

          {/* Avatars */}
          <View style={styles.avatarsRow}>
            {images.slice(1).map((img, idx) => (
              <Image key={idx} source={img} style={styles.avatar} />
            ))}
            <View style={styles.moreAvatar}>
              <Text style={styles.moreText}>+10</Text>
            </View>
          </View>

          {/* Event Date */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
                            <Image source={imageIndex.calendar1} style={styles.icon}/>

            </View>
            <View>
              <Text style={styles.detailTitle}>10 September, 2023</Text>
              <Text style={styles.detailSubtitle}>
                Tuesday, 8:00AM–11:00AM
              </Text>
            </View>
          </View>

          {/* Venue */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
                            <Image source={imageIndex.location1} style={styles.icon}/>

            </View>
            <View>
              <Text style={styles.detailTitle}>Goonj NGO</Text>
              <Text style={styles.detailSubtitle}>
                Sarita Vihar, New Delhi - 110076
              </Text>
            </View>
          </View>

          {/* Host */}
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Image source={imageIndex.girl} style={styles.icon}/>
            </View>
            <View>
              <Text style={styles.detailTitle}>Livia George</Text>
              <Text style={styles.detailSubtitle}>Nation Scheifer</Text>
            </View>
          </View>

          {/* Description */}
              <Text style={styles.detailTitle}>About</Text>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Lacus maecenas volutpat
            ipsum magna pharetra eu tellus. Vel vestibulum quis ut enim id dui
            amet diam arcu. Id convallis tincidunt amet congue eget. Fermentum
            sed risus in gravida ut amet est. A leo vitae elementum feugiat nec
            pharetra cursus. Lectus eget urna lectus neque suspendisse sit
            tempor. Dui leo lectus nisi lectus ut habitant.
          </Text>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  heroContainer: { position: "relative" },
  heroImage: { width: "100%", height: 220 },
  headerButtons: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    // backgroundColor: "#fff",
    // padding: 8,
    // borderRadius: 20,
    // elevation: 3,
  },
  iconText: { fontSize: 16, fontWeight: "bold" },

  content: { padding: 16 },
  title: { fontSize: 20, fontFamily:fonts.bold, color: "#000", marginBottom: 6 },
  byText: { fontSize: 14, color: "#666", marginBottom: 16, fontFamily:fonts.regular },

  avatarsRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: -10,
  },
  moreAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: { color: "#fff",fontFamily:fonts.bold },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailIcon: {
    // width: 36,
    // height: 36,
    // borderRadius: 18,
    // backgroundColor: "red",
    // justifyContent: "center",
    // alignItems: "center",
    marginRight: 15,
  },
  icon:{
     width: 45,
    height: 45,
  },
  detailTitle: { fontSize: 15,fontFamily:fonts.bold, color: "#000" },
  detailSubtitle: { fontSize: 13, color: "#666", fontFamily:fonts.regular },

  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginTop: 12,
    fontFamily:fonts.regular
  },
});
