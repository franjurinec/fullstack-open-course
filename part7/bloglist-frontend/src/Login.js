import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { login } from './reducers/userReducer'

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
