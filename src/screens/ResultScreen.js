import React, { useEffect } from 'react';
import useState from 'react-usestateref'
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
  const [timer, setTimer] = useState(route.params.timer);
  const [correctCount, setCorrectCount] = useState(0);
  const [isImportant, setIsImportant] = useState(false);
  const [isPassExam, setIsPassExam] = useState(false);

  useEffect(() => {
    getCorrectCount();
  });

  const getCorrectCount = () => {
    let correct = 0;
    for (let index = 0; index < questions.length; index++) {
      if (questions[index].correctAnswer == answers[index].answer) {
        correct = correct + 1;
      } else {
        if (questions[index].isImportant && questions[index].isImportant == true) {
          setIsImportant(true);
        }
      }
    }
    if (correctCount >= 21 && isImportant == false) {
      setIsPassExam(true);
    }
    setCorrectCount(correct);
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

  const onNavigate = (route, data) => {
    navigation.navigate(route, { exam: data })
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
          backgroundColor: COLORS.background
        }}>
        <Text style={{ fontSize: 30, color: isPassExam ? 'blue' : 'red' }}>{isPassExam ? 'B???n kh??ng ?????t:' : 'B???n ???? kh??ng ?????t'} {exam.name}</Text>
        {isImportant && <Text style={{ color: COLORS.error }}>*Sai c??u li???t</Text>}
        <Text style={{ marginTop: 5, fontSize: 15, color: COLORS.black }}>
          S??? c??u ????ng: <Text style={{ color: 'blue' }}>{correctCount}/25 </Text>
          - Th???i gian l??m b??i: <Text style={{ color: 'blue' }}>{Math.floor((1140 - timer) / 60)}' {Math.floor((1140 - timer) % 60)}s</Text></Text>
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
                <Text style={{ color: 'red' }}>{item.isImportant && item.isImportant == true ? '* ' : ''}</Text>
                C??u {index + 1}.  {item.question}
              </Text>
              {item.imgUrl != '' && item.imgUrl ? (
                <Image
                  source={{
                    uri: item.imgUrl,
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
        ListFooterComponent={() => (
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
              onPress={() => onNavigate('TestScreen', exam)}
            >
              <MaterialIcons name="replay" style={{ color: COLORS.white }} size={15} />
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  fontSize: 15,
                  marginLeft: 5
                }}>
                L??m l???i
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
                Trang ch???
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ResultScreen;
