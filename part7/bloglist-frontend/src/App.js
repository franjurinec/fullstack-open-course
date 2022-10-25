import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStoredUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import Notification from './components/Notification'
import Blogs from './Blogs'
import Login from './Login'
import Users from './Users'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadStoredUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return user ? (
    <Router>
      <h2>blogs</h2>
      <Notification />
      <div>
        <div>User {user.name} logged in</div>
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  ) : (
    <Login />
  )
}

export default App
