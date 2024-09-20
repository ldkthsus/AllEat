import {View, Text, TextInput, TextInputProps} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {icons} from '../../constants';
import {styles} from './FormField.styles'; // 스타일 파일 임포트

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string; // Optional Tailwind-style classes
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
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
      </View>
    </View>
  );
};

export default FormField;
