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
import { getAllQuestions } from '../utils/database';

const QuestionListScreen = ({ navigation }) => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  });

  const getQuestions = async () => {
    let questionList = await getAllQuestions();
    let tempQuestions = [];
    questionList.docs.forEach(question => {
      tempQuestions.push({ id: question.id.substring(3), ...question.data() });
    });
    setQuestions([...tempQuestions.sort((a, b) => parseInt(a.id) - parseInt(b.id))]);
  };

const getTextColor = (index, ansIndex) => {
  if (questions[index].correctAnswer == questions[index].answers[ansIndex]) {
    return "blue";
  }
  else {
    return "black"
  }
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
      <Text style={{ fontSize: 18, color: COLORS.white }}>200 câu hỏi ôn tập</Text>
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
          <View style={{ padding: 20, paddingTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              <Text style={{ color: 'red' }}>{item.isImportant && item.isImportant == true ? '* ' : ''}</Text>
              Câu {index + 1}.
              {item.question}
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
            justifyContent: 'center',
            marginBottom: 20,
            marginHorizontal: 20
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '80%',
              backgroundColor: COLORS.primary,
              marginTop: 20,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('HomeScreen')}>
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
      )}
    />
  </SafeAreaView>
);
};

export default QuestionListScreen;