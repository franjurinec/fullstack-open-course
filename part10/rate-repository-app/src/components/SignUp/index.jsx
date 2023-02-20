import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../Common/FormikTextInput';
import Text from '../Common/Text';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  signInForm: {
    padding: 16,
    backgroundColor: "white",
    display: 'flex'
  },
  signInSpaced: {
    marginTop: 16,
  },
  signInButton: {
    marginTop: 16,
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
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .max(30, 'Username maximum is 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password minimum is 5 characters')
    .max(30, 'Password maximum is 50 characters'),
  passwordConfirm: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords have to match')
})


const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput style={styles.signInSpaced} name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput style={styles.signInSpaced} name="passwordConfirm" placeholder="Password confirmation" secureTextEntry />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText} fontWeight="bold" >Sign Up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [ signUp ] = useMutation(CREATE_USER);
  const [ signIn ] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data: _signUpData } = await signUp({ variables: { username, password } })
      const { data: signInData } = await signIn({ username, password })
      if (signInData.authenticate.accessToken) navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp;