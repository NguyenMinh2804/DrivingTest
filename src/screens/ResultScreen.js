import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ResultScreen = ({ navigation, route }) => {

  const [exam, setExam] = useState(route.params.exam);
  const [questions, setQuestions] = useState(route.params.questions);
  const [answers, setAnswers] = useState(route.params.answers);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFail, setIsFail] = useState(false);
  const [isPassExam, setIsPassExam] = useState(false);

  useEffect(() => {
    getCorrectCount();
  }, []);

  const getCorrectCount = (index) => {
    for (let index = 0; index < questions.length; index++) {
      if (questions[index].correctAnswer == answers[index].answer) {
        console.log(index);
        setCorrectCount(correctCount + 1);
      } else {
        if (questions[index].isFail && questions[index].isFail == true) {
          setIsFail(true);
        }
      }
    }
    if (correctCount >= 21 && isFail == false) {
      setIsPassExam(true);
    }
  };

  // const checkPassOrFail = () => {
  //   if (correctCount)
  // }

  const getCorrectColor = (index) => {
    if (questions[index].correctAnswer == answers[index].answer) {
      return "blue";
    } else {
      return "red";
    }
  };

  const getTextColor = (index, ansIndex) => {
    if (questions[index].correctAnswer == questions[index].answers[ansIndex]) {
      return "blue";
    }
    else {
      if (questions[index].answers[ansIndex] == answers[index].answer) {
        return "red";
      } else {
        return "black"
      }
    }
  }
  const onNavigate = (route) => {
    navigation.navigate(route)
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: COLORS.white
        }}>
        <Text style={{ fontSize: 30, color: isPassExam ? 'blue' : 'red' }}>{isPassExam ? 'Bạn không đạt:' : 'Bạn đã không đạt'} {exam.name}</Text>
        {isFail && <Text style={{ color: COLORS.error }}>*Sai câu liệt</Text>}
        <Text style={{ marginTop: 5, fontSize: 15, color: COLORS.black }}>Số câu đúng: <Text style={{ color: 'blue' }}>{correctCount}/25 </Text> - Thời gian làm bài: <Text style={{ color: 'blue' }}> 10' 35s </Text></Text>
      </View>
      <FlatList
        data={questions}
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (

          <View
            style={{
              marginHorizontal: 5,
              backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 2,
              borderColor: COLORS.white,
              borderWidth: 1,
              marginBottom: 5
            }}>
            <MaterialIcons size={20} name={getCorrectColor(index) == 'blue' ? "check" : "close"} style={{ color: getCorrectColor(index) }} />
            <View style={{ padding: 20, paddingTop: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Câu {index + 1}.  {item.question}
              </Text>
              {item.imageUrl != '' && item.imageUrl ? (
                <Image
                  source={{
                    uri: item.imageUrl,
                  }}
                  resizeMode={'contain'}
                  style={{
                    width: '100%',
                    height: 300,
                    marginTop: 20,
                    borderRadius: 5,
                  }}
                />
              ) : null}
            </View>
            {item.answers.map((answer, ansIndex) => {
              return (
                <View
                  key={ansIndex}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    borderTopWidth: 1,
                    borderColor: COLORS.border,
                    // backgroundColor: getOptionBgColor(item, option),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      width: 25,
                      height: 25,
                      padding: 2,
                      borderWidth: 1,
                      borderColor: getTextColor(index, ansIndex),
                      textAlign: 'center',
                      marginRight: 16,
                      borderRadius: 25,
                      color: 'black',
                    }}>
                  </Text>
                  <Text style={{
                    color: getTextColor(index, ansIndex),
                    paddingRight: 20
                  }}>
                    {answer}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          marginHorizontal: 20
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            width: '40%',
            backgroundColor: COLORS.primary,
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={() => onNavigate('ExamListScreen')}
        >
          <MaterialIcons name="replay" style={{ color: COLORS.white }} size={15} />
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
              marginLeft: 5
            }}>
            Làm lại
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            width: '40%',
            backgroundColor: COLORS.primary,
            marginTop: 20,
            borderRadius: 5,
          }}
          onPress={() => onNavigate('HomeScreen')}
        >
          <MaterialIcons name="home" style={{ color: COLORS.white }} size={15} />
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              fontSize: 15,
              marginLeft: 5
            }}>
            Trang chủ
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ResultScreen;
