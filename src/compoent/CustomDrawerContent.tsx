import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import imageIndex from '../assets/imageIndex';
import LogoutModal from './LogoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/feature/authSlice';
import ScreenNameEnum from '../routes/screenName.enum';
import { successToast } from '../utils/customToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from '../localization/LocalizationString';


const CustomDrawerContent = (props: any) => {
  const isLogins = useSelector((state: any) => state?.feature);
  const isLogin = useSelector((state: any) => state?.auth);

  const user = isLogins.userGetData ? isLogins.userGetData  : isLogin.userData
  //  console.log('by drawer', user)
  const navigation = props.navigation;
  const [isModalVisible, setModalVisible] = useState(false);
  const handleNavigation = (screenName: any) => {
    // console.log(screenName)
    if (screenName) {
      navigation.navigate(screenName);
    } else {
    }
  };
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubMenu = (id: string) => {
    setExpandedMenu(prev => (prev === id ? null : id));
  };
  const renderItem = ({ item }: any) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenu === item.id;

    return (
      <View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            if (hasChildren) {
              toggleSubMenu(item.id);
            } else {
              handleNavigation(item.screen);
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item.icon && <Image source={item.icon} style={styles.icon} />}
            <Text style={styles.menuText}>{item.title}</Text>
          </View>
          {hasChildren ? (
            isExpanded ?
              <Image source={imageIndex.arrowDown} style={{ height: 24, width: 24 }} />
              :
              <Image source={imageIndex.arrowRight} style={{ height: 24, width: 24 }} />

          ) : (
            <Image source={imageIndex.arrowRight} style={{ height: 24, width: 24 }} />
          )}
        </TouchableOpacity>

        {isExpanded && item.children?.map((child: any) => {
          const hasGrandChildren = child.children && child.children.length > 0;
          const isGrandExpanded = expandedMenu === child.id;

          return (
            <View key={child.id}>
              <TouchableOpacity
                style={styles.subMenuItem}
                onPress={() => {
                  if (hasGrandChildren) {
                    toggleSubMenu(child.id);
                  } else {
                    if (child.index !== undefined) {
                      navigation.navigate(child.screen, { index: child.index });
                    } else {
                      handleNavigation(child.screen);
                    }
                  }
                }}
              >
                <Text style={styles.subMenuText}>{child.title}</Text>
              </TouchableOpacity>

              {hasGrandChildren && isGrandExpanded && child.children.map((grandChild: any) => (
                <TouchableOpacity
                  key={grandChild.id}
                  style={[styles.subMenuItem, { paddingLeft: 80 }]}
                  onPress={() =>
                    navigation.navigate(grandChild.screen, { index: grandChild.index, navigation: navigation })
                  }
                >
                  <Text style={styles.subMenuText}>{grandChild.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}

      </View>
    );
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setModalVisible(false);
    AsyncStorage.removeItem('userRole');  // AsyncStorage में save
    navigation.replace(ScreenNameEnum.ChooseRoleScreen);
    successToast(localizationStrings.logoutSuccess);
  };
  return (
    <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        {user?.image ?
          <Image source={{ uri: user?.image }} style={styles.logoImage} /> :
          <Image source={imageIndex.userDummy} style={styles.logoImage} />
        }
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '700',
              color: 'rgba(0, 0, 0, 1)',
              lineHeight: 36,
              marginTop: 15,
              textAlign: 'center'
            }}>{user ? user?.first_name + " " + user?.last_name : localizationStrings.drawerTitle}
          </Text>
        </View>
        <View style={{ width: '85%', }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'rgba(157, 178, 191, 1)',
              lineHeight: 24,
              marginTop: 5,
              textAlign: 'center'
            }}>
            {user ? user?.email : localizationStrings.drawerDes}
          </Text>
        </View>
      </View>
      <View style={{
        marginTop: 0,
      }}>
        {/* FlatList for menu items */}
        <FlatList
          data={props.menuItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false} // क्योंकि DrawerContentScrollView पहले से स्क्रॉल है
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => setModalVisible(true)}>
        <Image source={imageIndex.logout} style={{
          height: 35, width: 35,
        }} resizeMode='cover' />
        <Text style={styles.logoutText}>{localizationStrings.logout}</Text>
      </TouchableOpacity>
      <LogoutModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          handleLogout()
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  logoImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
    resizeMode: 'cover',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    justifyContent: "space-between"
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
    fontWeight: "500"
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  logoutButton: {
    position: "relative",
    top: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 14,

  },
  logoutText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'rgba(53, 44, 72, 1)',
    fontWeight: "500",
    lineHeight: 100,

  },
  subMenuItem: {
    paddingLeft: 60,
    paddingVertical: 10,
  },
  subMenuText: {
    fontSize: 14,
    color: '#333',
  },
});

export default CustomDrawerContent;
