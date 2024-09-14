import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {icons} from '../../constants';
import {styles} from './FormField.styles'; // 스타일 파일 임포트

interface FormFieldProps extends TextInputProps {
  title?: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  unit?: string;
  otherStyles?: StyleProp<ViewStyle>; // Optional Tailwind-style classes
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  unit,
  value,
  placeholder,
  handleChangeText,
  otherStyles, // 추가된 스타일
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, !title && {marginTop: 0}, otherStyles]}>
      {title && <Text style={styles.label}>{title}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <icons.passwordCheck width={30} height={30} />
          </TouchableOpacity>
        )}
        {unit && (
          <Text style={styles.unit}>{unit}</Text> // 단위 텍스트 추가
        )}
      </View>
    </View>
  );
};

export default FormField;
