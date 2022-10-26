import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStoredUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadStoredUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const margin = {
    margin: 5
  }

  const headerBg = {
    background: 'gainsboro'
  }

  return user ? (
    <Router>
      <div style={headerBg}>
        <Link style={margin} to="/">
          blogs
        </Link>
        <Link style={margin} to="/users">
          users
        </Link>
        <span style={margin}>{user.name} logged in</span>
        <button style={margin} onClick={() => dispatch(logout())}>
          logout
        </button>
      </div>
      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
      <Notification />
    </Router>
  ) : (
    <Login />
  )
}

export default App
