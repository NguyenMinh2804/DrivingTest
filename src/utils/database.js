import firestore from '@react-native-firebase/firestore';

export const getExams = () => {
  return firestore().collection('exams').get();
};

export const getDetailExam = (examId) => {
  return firestore().collection('exams').doc(examId).get();
};

export const getDetailQuestion = (questionId) => {
  return firestore().collection('questions').doc(questionId).get();
};

export const getAllQuestions = () => {
  return firestore().collection('questions').get();
};