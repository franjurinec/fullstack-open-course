import { useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import Notification from './Notification'
import { login } from '../reducers/loginReducer'
import { Box, Center, Heading } from '@chakra-ui/react'

const Login = () => {
  const dispatch = useDispatch()
  return (
    <Center width="100wh" height="100vh" backgroundColor="gray.100">
      <Box
        backgroundColor="white"
        color="gray.600"
        boxShadow="xl"
        rounded="lg"
        p="8"
        w="sm"
      >
        <Heading py="5" size="lg" textAlign="center">
          Log in
        </Heading>
        <LoginForm
          onSubmit={(username, password) => dispatch(login(username, password))}
        />
      </Box>
      <Notification />
    </Center>
  )
}

export default Login
