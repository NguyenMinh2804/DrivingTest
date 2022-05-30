import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ResultModal = ({
  isModalVisible,
  isTimeOut,
  handleOnClose,
  handleResult,
}) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleOnClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black + '90',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            borderRadius: 5,
            padding: 40,
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 28, color: COLORS.black, marginBottom: 20 }}>{isTimeOut ? 'Hết thời gian' : 'Xác nhận nộp bài?'}</Text>
          {!isTimeOut &&
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                width: '100%',
                backgroundColor: 'red',
                marginTop: 20,
                borderRadius: 50,
              }}
              onPress={handleOnClose}>
              <MaterialIcons name="close" style={{ color: COLORS.white }} />
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.white,
                  marginLeft: 10,
                }}>
                Đóng
              </Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              width: '100%',
              backgroundColor: COLORS.primary,
              marginTop: 20,
              borderRadius: 50,
            }}
            onPress={handleResult}>
            <MaterialIcons name="check" style={{ color: COLORS.white }} />
            <Text
              style={{
                textAlign: 'center',
                color: COLORS.white,
                marginLeft: 10,
              }}>
              Nộp bài
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ResultModal;
