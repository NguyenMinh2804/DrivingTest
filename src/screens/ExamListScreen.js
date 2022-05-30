import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../constants/theme';
import { getExams } from '../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ExamListScreen = ({ navigation }) => {
  const [allExams, setAllExams] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getAllExams = async () => {
    setRefreshing(true);
    const Exams = await getExams();
    let tempExams = [];
    Exams.docs.forEach(async exam => {
      tempExams.push({ id: exam.id, ...exam.data() });
    });
    setAllExams([...tempExams]);
    setRefreshing(false);
  };

  useEffect(() => {
    getAllExams();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.primary + '20',
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.primary,
          elevation: 4,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <MaterialIcons
          color={COLORS.white}
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 18, color: COLORS.white }}>Danh sách đề A1</Text>
      </View>

      {/* Quiz list */}
      <FlatList
        data={allExams}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({ item: exam }) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 18, color: COLORS.black }}>
                {exam.name}
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.black }}>
                25 câu - 19 phút
              </Text>
            </View>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 50,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={() => {
                navigation.navigate('TestScreen', {
                  exam: exam,
                });
              }}>
              <Text style={{ color: COLORS.primary }}>Bắt đầu</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </SafeAreaView>
  );
};

export default ExamListScreen;
