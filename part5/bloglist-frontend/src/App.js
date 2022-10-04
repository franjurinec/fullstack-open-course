import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
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

  const onBlogCreate = async (title, author, url) => {
    try {
      const result = await blogService.createBlog({title, author, url})
      setBlogs(blogs.concat(result))
    } catch (error) {
      console.error('Blog creation failed!')
    }
  }

  // On load - Fetch blogs
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

  // On load - Load user from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  // On user change - Update blogService auth token
  useEffect(() => {
    if (user) 
      blogService.setToken(user.token) 
  }, [user])


  if (user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
          <LoginForm onSubmit={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>User {user.name} logged in</p>
      <BlogForm onSubmit={onBlogCreate} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <button onClick={onLogout}>logout</button>
    </div>
  )
}

export default App
