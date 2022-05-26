import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  TestScreen,
  ExamListScreen
} from '../screens';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="ExamListScreen" component={ExamListScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
