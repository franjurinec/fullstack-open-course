import { useDispatch } from 'react-redux'
import LoginForm from './LoginForm'
import Notification from './Notification'
import { login } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm
        onSubmit={(username, password) => dispatch(login(username, password))}
      />
    </div>
  )
}

export default Login
