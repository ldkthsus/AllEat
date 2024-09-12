import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {styles} from './AppBar.styles'; // 스타일 파일 임포트
import {icons} from '../constants';
const AppBar: React.FC = () => {
  return (
    <View style={styles.appBar}>
      <Pressable style={styles.iconHomeParent} onPress={() => {}}>
        <icons.home height={30} width={30} />
        <Text style={styles.text}>홈</Text>
      </Pressable>

      <Pressable
        style={[styles.creditCardParent, styles.parentPosition]}
        onPress={() => {}}>
        <icons.pay height={30} width={30} />
        <Text style={[styles.text]}>페이머니</Text>
      </Pressable>

      <Pressable
        style={[styles.descriptionParent, styles.parentPosition]}
        onPress={() => {}}>
        <icons.log height={30} width={30} />
        <Text style={[styles.text]}>로그</Text>
      </Pressable>

      <Pressable style={styles.kikiParent} onPress={() => {}}>
        <icons.mypage height={30} width={30} />
        <Text style={[styles.text]}>마이 페이지</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
