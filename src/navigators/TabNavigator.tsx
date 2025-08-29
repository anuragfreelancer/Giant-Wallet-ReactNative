// src/navigation/BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from '../compoent/tabBarComponent';
import HomeScreen from '../screen/BottomTab/Dashboard/DashboardScreen';

import SwapScreen from '../screen/BottomTab/swap/swap';
import EarnList from '../screen/BottomTab/Earn/EarnList';
import ProfileScreen from '../screen/Profile/Profile';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Swap" component={SwapScreen} options={{ tabBarLabel: 'Swap' }} />
      <Tab.Screen name="Earn" component={EarnList} />
      {/* <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'cart' }} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
