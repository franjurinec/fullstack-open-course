import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [user, setUser] = useState(undefined)

  const [blogs, setBlogs] = useState([])

  const onLogin = async (username, password) => {
    try {
      const result = await loginService.login(username, password)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(result))
      setUser(result)
    } catch (error) {
      console.error('Login failed!')
    }
  }

  const onLogout = async () => {
    setUser(undefined)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        console.error('Failed to fetch blogs!')
      }
    }
    fetchBlogs()
  }, [])

  // Load user from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  // Update blogService auth token when user changes
  useEffect(() => {
    if (user) 
      blogService.setToken(user.token) 
  }, [user])


  if (user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
          <LoginForm onLoginSubmit={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>User {user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={onLogout}>logout</button>
    </div>
  )
}

export default App
