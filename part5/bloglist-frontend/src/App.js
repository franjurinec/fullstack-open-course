import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])
  const [messages, setMessages] = useState([])

  const errorMessage = (message) => {
    setMessages(m => m.concat({message, type: 'error'}))
    setTimeout(() => setMessages(m => m.slice(1)), 5000)
  }

  const successMessage = (message) => {
    setMessages(m => m.concat({message, type: 'success'}))
    setTimeout(() => setMessages(m => m.slice(1)), 5000)
  }

  const onLogin = async (username, password) => {
    try {
      const result = await loginService.login(username, password)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(result))
      setUser(result)
      successMessage(`Logged in as ${result.name}!`)
    } catch (error) {
      errorMessage('Wrong username or password!')
    }
  }

  const onLogout = async () => {
    setUser(undefined)
    window.localStorage.removeItem('loggedBloglistUser')
    successMessage(`Logged out!`)
  }

  const onBlogCreate = async (title, author, url) => {
    try {
      const result = await blogService.createBlog({title, author, url})
      setBlogs(blogs.concat(result))
      successMessage(`A new blog "${title}" by ${author} added!`)
    } catch (error) {
      errorMessage('Blog creation failed!')
    }
  }

  // On load - Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        errorMessage('Failed to fetch blogs!')
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
        {messages.map(({message, type}) => <Message key={message} message={message} type={type} />)}
        <LoginForm onSubmit={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {messages.map(({message, type}) => <Message key={message} message={message} type={type} />)}
      <p>User {user.name} logged in <button onClick={onLogout}>logout</button></p>
      <BlogForm onSubmit={onBlogCreate} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
