import React, {useState} from 'react';
import {View, Text, Modal, TextInput, Pressable, StyleSheet} from 'react-native';

interface CalanderModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void; // 충전 금액을 전달할 함수
  placeholderText: string; // 모달창의 안내 텍스트
  guideText: string; // placeholder 텍스트
}

const CalanderModal: React.FC<CalanderModalProps> = ({}) => {
  const [amount, setAmount] = useState<string>(''); // 충전 금액


  return (
    <Modal>
      <View>
        <Text>test</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    color: '#000000',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    paddingRight: 25, // TextInput 안쪽에 여유 공간 확보
    fontFamily: 'Pretendard-Light'
  },
  wonSymbol: {
    position: 'absolute',
    right: 10, // TextInput 내부 오른쪽에 위치하도록 설정
    top: 15, // 세로 중앙 정렬
    fontSize: 16,
    color: 'black'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '5%'
  },
  button: {
    borderRadius: 15,
    paddingHorizontal: 48,
    paddingVertical: 15,
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonConfirm: {
    backgroundColor: '#769bff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
  },
});

export default InoutModal;
