import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { COLORS } from '../constants/theme';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView >
      <View style={{marginTop: 200}}>
      <Button
        onPress={() => navigation.navigate('ExamListScreen')}
        title="Thi lý thuyết bằng lái A1"
        color={COLORS.primary}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  }
});

export default HomeScreen;


