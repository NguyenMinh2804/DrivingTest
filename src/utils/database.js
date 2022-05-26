import firestore from '@react-native-firebase/firestore';

export const getExams = () => {
  return firestore().collection('exams').get();
};
