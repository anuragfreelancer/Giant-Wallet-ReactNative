import React, {FunctionComponent} from 'react';
import {LogBox, StatusBar, View, Text, StyleSheet} from 'react-native';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import AppNavigator from './src/navigators/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';



LogBox.ignoreAllLogs();

const App: FunctionComponent<any> = () =>
    <SafeAreaView edges={['bottom']} style={{flex:1}}>
    <AppNavigator />

    </SafeAreaView>

export default App;