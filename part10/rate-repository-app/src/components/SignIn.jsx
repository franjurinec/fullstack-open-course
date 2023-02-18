import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
  signInForm: {
    padding: 16,
    backgroundColor: "white",
    display: 'flex',
    gap: 16
  },
  signInInput: {
    margin: 8,
  },
  signInButton: {
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInButtonText: {
    color: 'white'
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText} fontWeight="bold" >Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
};

export default SignIn;