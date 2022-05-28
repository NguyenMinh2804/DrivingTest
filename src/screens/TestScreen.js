import React, { useState, useEffect } from 'react';
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

const TestScreen = ({ navigation, route }) => {

  const [currentExamId, setCurrentExamId] = useState(route.params.examId);
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);

  const getExamAndQuestionDetails = async () => {
    // Get Exam
    let currentExam = (await getDetailExam(currentExamId)).data();

    let tempQuestions = [];
    if (currentExam.questions && currentExam.questions.length > 0) {
      for (let index = 0; index < currentExam.questions.length; index++) {
        let question = (await getDetailQuestion(currentExam.questions[index])).data();
        tempQuestions.push(question);
      }
      setQuestions([...tempQuestions]);
    }
    setName(currentExam.name);
  };

  useEffect(() => {
    getExamAndQuestionDetails();
  }, []);

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
          backgroundColor: COLORS.white,
          elevation: 4,
        }}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontSize: 16, marginLeft: 10 }}>Thi lý thuyết bằng lái A1 - {name}</Text>
      </View>
      <FlatList
        data={questions}
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question}
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
                Câu {index + 1}. {item.question}
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
              selectedBtn={(e) => console.log(e.label)}
              activeColor={COLORS.secondary}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Nộp bài"
            style={{ margin: 10 }}
            handleOnPress={() => {
              // Show Result modal
              setIsResultModalVisible(true);
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};


export default TestScreen;


