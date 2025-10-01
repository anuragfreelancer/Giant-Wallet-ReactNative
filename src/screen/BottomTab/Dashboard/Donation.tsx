import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { color, fonts } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { GetCompaignAPI, GetFoundationApi } from "../../../Api/apiRequest";
import { useSelector } from "react-redux";
import LoadingModal from "../../../utils/Loader";

const stories = [
  { id: "1", image: imageIndex.v1 },
  { id: "2", image: imageIndex.v2 },
  { id: "3", image: imageIndex.v3 },
  { id: "4", image: imageIndex.v4 },
  
];

const donations = [
  {
    id: "1",
    title: "How do we enrich the lives of India's poor farmers?",
    author: "Sara Adhikari",
    date: "September 17, 2023",
    image: imageIndex.l1,
  },
  {
    id: "2",
    title: "Foreign funding for NGOs in India in 2020",
    author: "Ashutosh Kumar",
    date: "June 18, 2023",
    image: imageIndex.l2,
  },
    { id: "1", image: imageIndex.v1 },
  { id: "2", image: imageIndex.v2 },
  { id: "3", image: imageIndex.v3 },
  { id: "4", image: imageIndex.v4 },
    { id: "1", image: imageIndex.v1 },
  { id: "2", image: imageIndex.v2 },
  { id: "3", image: imageIndex.v3 },
  { id: "4", image: imageIndex.v4 },
];

type CompaignType = {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  // add other properties if needed
};

export default function DonationScreen() {
  const isLogin = useSelector((state: any) => state?.auth);
  const [data, setData] = useState<any[]>([])
  const [compaign, setCompaign] = useState<CompaignType[]>([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    fetchData()
  },[])
  const fetchData = async () => {
    const param = {
      token: isLogin?.token
    }
   const data = await GetFoundationApi(param, setLoading)
   setData(data)
   const data2 = await GetCompaignAPI(param, setLoading)
console.log('data2', data2?.data)
setCompaign(data2?.data)
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal/>}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Actions */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <Image source={imageIndex.back} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenNameEnum.DonationTrackingDetail, {item:data[0]})}>
            <Image source={imageIndex.locationCircle} style={{ height: 30, width: 30 }} />

          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View style={styles.banner}>
          <Image
            source={data[0]?.logo? {uri:data[0]?.logo} : imageIndex.banner}
            style={styles.bannerImage}
          />
          <Image source={data[0]?.logo? {uri:data[0]?.logo} : imageIndex.overlay} style={styles.bannerOverlay} />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>{data[0]?.name }</Text>
            <Text style={styles.bannerSubtitle}>
             { data[0]?.description}
            </Text>
            <TouchableOpacity style={styles.visitButton} onPress={() => navigation.navigate(ScreenNameEnum.DonationTrackingDetail,{item:data[0]})}>
              <Text style={styles.visitButtonText}>VISIT NOW</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories in Motion */}
        <Text style={styles.sectionTitle}>Stories in Motion</Text>
        <View style={styles.storyGrid}>
          {stories.map((story) => (
            <View key={story.id} style={styles.storyCard}>
              <Image source={story.image} style={styles.storyImage} />
              <View style={styles.playOverlay}>
                <Image source={imageIndex.videoIcon} style={styles.playIcon} />
              </View>
            </View>
          ))}
        </View>

 {/* Pinned Feed */}
        <Text style={styles.sectionTitle}>Pinned Feed</Text>
        {/* <FlatList
          data={[compaign[0], compaign[1]]}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.donationCard} onPress={() => navigation.navigate(ScreenNameEnum.DonationDetail, { item })}>
              { item?.image &&
              <View>
                
                <Image source={{uri:item.image}} style={styles.donationImage} />
                <View style={styles.donationIcon}>
                <Image source={imageIndex.pin} style={styles.icond} />
         </View>
           </View>
              }
            
           <View style={styles.donationInfo}>
                <Text style={styles.donationTitle} numberOfLines={2}>
                  {item?.title}
                </Text>
                <Text style={styles.donationMeta} numberOfLines={2}>
                  {item?.description} 
                </Text>
              </View>
              <Image source={imageIndex.next} style={{ height: 25, width: 25, marginLeft:5 }} />
            </TouchableOpacity>
          )}
        /> */}
        {/* Needed Donation */}
        <Text style={styles.sectionTitle}>Needed Donation</Text>
        <FlatList
          data={compaign}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.donationCard} onPress={() => navigation.navigate(ScreenNameEnum.DonationDetail, { item })}>
              { item?.image &&
                <Image source={{uri:item.image}} style={styles.donationImage} />
           
              }
                {/* <Image source={donations[index].image} style={styles.donationImage} /> */}

           <View style={styles.donationInfo}>
                <Text style={styles.donationTitle} numberOfLines={2}>
                  {item?.title}
                </Text>
                <Text style={styles.donationMeta} numberOfLines={2}>
                  {item?.description} 
                  {/* / {item.date} */}
                </Text>
              </View>
              <Image source={imageIndex.next} style={{ height: 25, width: 25, marginLeft:5 }} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    marginBottom: 20
  },
  iconText: { fontSize: 18 },

  banner: {
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  bannerImage: { width: "100%", height: 160, borderRadius: 16, opacity:0.5, backgroundColor:'#000' },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    height: '100%',
    width: '100%',
    opacity:0.5
  },
  bannerContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  bannerTitle: { fontSize: 16, fontFamily: fonts.bold, color: "#fff" },
  bannerSubtitle: { fontSize: 12, color: "#eee", marginBottom: 6, fontFamily: fonts.medium, },
  visitButton: {
    backgroundColor: color.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  visitButtonText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.bold,
    marginHorizontal: 16,
    marginVertical: 12,
  },

  storyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 16,
  },
  storyCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  storyImage: { width: "100%", height: "100%" },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  playIcon: { height: 45, width: 45 },

  donationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    padding: 10,
    borderRadius: 12,
  },
  donationImage: { width: 90, height: 90, borderRadius: 10, marginRight: 12 },
  donationIcon: {  position:'absolute', bottom:5, right:10, backgroundColor:'#ffffff38', padding:5, borderRadius:30 },
 icond:{width: 25, height: 25},
  donationInfo: { flex: 1 },
  donationTitle: { fontSize: 14, fontFamily: fonts.bold, color: "#000" , marginRight:15},
  donationMeta: { fontSize: 12, color: "#666", marginTop: 2, fontFamily: fonts.medium, },
  arrow: { fontSize: 20, color: "#aaa", marginLeft: 8 },
});
