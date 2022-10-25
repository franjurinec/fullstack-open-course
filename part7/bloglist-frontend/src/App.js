import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loadStoredUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route
  //  Link,
} from 'react-router-dom'
import Blogs from './Blogs'
import Login from './Login'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  // On load - Load user from localStorage
  useEffect(() => {
    dispatch(loadStoredUser())
  }, [dispatch])

  // On load - Fetch blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return user ? (
    <Router>
      <Routes>
        <Route path="/" element={<Blogs />} />
      </Routes>
    </Router>
  ) : (
    <Login />
  )
}

export default App
