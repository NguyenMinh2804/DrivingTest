import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image
} from 'react-native';
import { COLORS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getDetailExam, getDetailQuestion } from '../utils/database';
import RadioButtonRN from 'radio-buttons-react-native';
import FormButton from '../components/shared/FormButton';
import ResultModal from '../components/shared/ResultModal';

const TestScreen = ({ navigation, route }) => {

  const [currentExam, setCurrentExam] = useState(route.params.exam);
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(1140);
  const [answers, setAnswers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  let timerRef = React.useRef(timer);

  const getExamAndQuestionDetails = async () => {
    let tempQuestions = [];
    let tempAnwers = [];

    if (currentExam.questions && currentExam.questions.length > 0) {
      for (let index = 0; index < currentExam.questions.length; index++) {
        let tempQuestion = await getDetailQuestion(currentExam.questions[index]);
        let question = { id: tempQuestion.id, ...tempQuestion.data() };
        tempQuestions.push(question);
      }
      setQuestions([...tempQuestions]);

      tempQuestions.forEach((question, index) => {
        let tempAnswer;
        tempAnswer = { id: index, answer: "" };
        tempAnwers.push(tempAnswer);
      })
      setAnswers([...tempAnwers]);
    }
    setName(currentExam.name);
  };

  useFocusEffect(
    React.useCallback(() => {
      getExamAndQuestionDetails();

      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          setIsTimeOut(true);
          clearInterval(timerId);
        } else {
          setTimer(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, [])
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: COLORS.primary,
          elevation: 4,
        }}>
        <MaterialIcons
          color={COLORS.white}
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 16, marginLeft: 10, color: COLORS.white }}>
          Thi lý thuyết bằng lái A1 - {name} {"\n"}
          Thời gian còn lại: {Math.floor(timer / 60)}' {Math.floor(timer % 60)}s
        </Text>
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
              marginTop: 14,
              marginHorizontal: 10,
              backgroundColor: COLORS.white,
              elevation: 2,
              borderRadius: 2,
            }}>
            <View style={{ padding: 20 }}>
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
            <RadioButtonRN
              data={item.answers.map(function (answer) {
                return { "label": answer };
              })}
              selectedBtn={
                (e) => {
                  let tempAnwers = [...answers];
                  tempAnwers[index].answer = e.label;
                  setAnswers(tempAnwers);
                }
              }
              activeColor={COLORS.secondary}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Nộp bài"
            style={{ margin: 10 }}
            handleOnPress={() => {
              setIsModalVisible(true);
            }}
          />
        )}
      />
      <ResultModal
        isModalVisible={isModalVisible}
        isTimeOut={false}
        handleOnClose={() => {
          setIsModalVisible(false);
        }}
        handleResult={() => {
          navigation.navigate('ResultScreen', {
            exam: currentExam,
            questions: questions,
            answers: answers
          });
          setIsModalVisible(false);
        }}
      />
      <ResultModal
        isModalVisible={isTimeOut}
        isTimeOut={true}
        handleOnClose={() => {
          setIsTimeOut(false);
        }}
        handleResult={() => {
          navigation.navigate('ResultScreen', {
            exam: currentExam,
            questions: questions,
            answers: answers
          });
          setIsTimeOut(false);
        }}
      />
    </SafeAreaView>
  );
};


export default TestScreen;


