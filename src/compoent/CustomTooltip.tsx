import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import imageIndex from "../assets/imageIndex"; // your local icons
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../routes/screenName.enum";

export default function TooltipMenu() {
  const [visible, setVisible] = useState(false);

  const menuItems = [
    { label: "Import Token", icon: imageIndex.importToken },
    { label: "Add Network", icon: imageIndex.global },
    { label: "Pin Token", icon: imageIndex.pin },
  ];
const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Tooltip
        isVisible={visible}
        showChildInTooltip={false}
        tooltipStyle={{
            marginTop:-50,
            marginLeft:10
        }}
        placement="bottom"
        onClose={() => setVisible(false)}
        content={
          <View style={styles.menu}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && { borderBottomWidth: 0 }, // remove last divider
                ]}
                onPress={() => {
                  console.log(item.label);
                  setVisible(false);
                  if(index == 0){
                    navigation.navigate(ScreenNameEnum.ImportTokenScreen)
                  }
                  if(index == 1){
                    navigation.navigate(ScreenNameEnum.ImportCustomTokenScreen)
                  }
                  if(index == 2){
                    navigation.navigate(ScreenNameEnum.TokenPinScreen)
                  }
                }}
              >
                <Image source={item.icon} style={styles.menuIcon} />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        contentStyle={styles.contentStyle}
        backgroundColor="transparent"
      >
        {/* anchor view for tooltip */}
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image source={imageIndex.more} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor:'red'
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    minWidth: 160,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: "#FF4C4C",
  },
  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#222",
  },
  contentStyle: {
    backgroundColor: "transparent",
    padding: 0,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
