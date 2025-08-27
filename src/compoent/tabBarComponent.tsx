// src/components/BottomTabBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import imageIndex from '../assets/imageIndex';
import { color, fonts } from '../constant';

const tabIcons = {
  Home: {
    active: imageIndex.homeActive,
    // inactive: imageIndex.homeActive,
  },
  Swap: {
    active: imageIndex.swipeActive,
    // inactive: imageIndex.swipeActive,
  },
  Earn: {
    active: imageIndex.earn,
    // inactive: imageIndex.earnActive,
  },

  Profile: {
    active: imageIndex.profile,
    // inactive: imageIndex.profile,
  },
};

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const icon = tabIcons[route.name as keyof typeof tabIcons];

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            style={styles.tabItem}
          >
            <Image
              source={icon.active}
              style={[
                styles.icon,
                { tintColor: isFocused ? color.primary : '#A9A9A9' },
              ]}
              resizeMode="contain"
            />
            <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 90,
    justifyContent: 'space-around',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#666',
    fontFamily: fonts.regular,
    textAlign: 'center'
  },
  activeLabel: {
    color: color.primary,
    fontFamily: fonts.medium

  },
});

export default BottomTabBar;
