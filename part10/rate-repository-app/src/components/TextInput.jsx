import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  inputField: {
    padding: 8,
    margin: 8,
    borderColor: theme.colors.textFaded,
    borderRadius: 4,
    borderWidth: 1
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.inputField];

  return <NativeTextInput placeholderTextColor={theme.colors.textFaded} style={textInputStyle} {...props} />;
};

export default TextInput;