import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './navigators/AppStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
};


export default App;


