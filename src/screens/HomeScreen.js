import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {

  const onNavigate = (route) => {
    navigation.navigate(route)
  }

  return (
    <SafeAreaView style={{
      backgroundColor: COLORS.primary + 20, position: 'relative', flex: 1
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
      }}>
        <Text style={{ color: 'black', fontSize: 28 }}>ÔN THI GPLX MÁY</Text>
      </View>
      <View style={{
        marginHorizontal: 20, marginVertical: 20, flexDirection: 'row',
      }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: 80,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginRight: 35
          }}
          onPress={() => navigation.navigate('ExamListScreen')}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
            }}>
            Thi lý thuyết
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: 80,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate('TestScreen', {
            exam: "20cauliet",
          })}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
            }}>
            Ôn tập 20 câu liệt
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{
        marginHorizontal: 20, marginVertical: 20, flexDirection: 'row',
      }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: 80,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
            marginRight: 35
          }}
          onPress={() => navigation.navigate('TestScreen', {
            exam: "ngaunhien",
          })}>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
            }}>
            Đề ngẫu nhiên
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45%',
            height: 80,
            backgroundColor: COLORS.primary,
            borderRadius: 5,
          }}
          onPress={() => {
            console.log("!");
            navigation.navigate('QuestionListScreen')
          }
          }>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
            }}>
            Ôn tập 200 câu lý thuyết
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default HomeScreen;


