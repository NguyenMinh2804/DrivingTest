import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  TestScreen,
  ExamListScreen,
  ResultScreen,
  QuestionListScreen
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
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="QuestionListScreen" component={QuestionListScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
