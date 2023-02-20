import { Formik } from 'formik';
import * as yup from 'yup';
import { Pressable, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import FormikTextInput from '../Common/FormikTextInput';
import Text from '../Common/Text';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput style={styles.signInSpaced} name="password" placeholder="Password" secureTextEntry />
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text style={styles.signInButtonText} fontWeight="bold" >Sign In</Text>
      </Pressable>
    </View>
  )
}

export const SignInContainer = ({ onSubmit }) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
  </Formik>
)

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password })
      if (data.authenticate.accessToken) navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn;