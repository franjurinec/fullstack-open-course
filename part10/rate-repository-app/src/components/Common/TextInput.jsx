import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  inputField: {
    padding: 8,
    borderColor: theme.colors.textFaded,
    borderRadius: 4,
    borderWidth: 1
  },
  error: {
    borderColor: theme.colors.error,
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.inputField,
    error && styles.error, 
    style
  ];

  return <NativeTextInput placeholderTextColor={theme.colors.textFaded} style={textInputStyle} {...props} />;
};

export default TextInput;