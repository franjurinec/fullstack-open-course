import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog
} from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((b1, b2) => b2.likes - b1.likes)
  )

  const [user, setUser] = useState(undefined)

  // On load - Fetch blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
    if (user) blogService.setToken(user.token)
  }, [user])

  const onLogin = async (username, password) => {
    try {
      const result = await loginService.login(username, password)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(result))
      setUser(result)
      dispatch(notify(`Logged in as ${result.name}!`))
    } catch (error) {
      dispatch(notify('Wrong username or password!', 'error'))
    }
  }

  const onLogout = async () => {
    setUser(undefined)
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(notify('Logged out!'))
  }

  const blogFormRef = useRef()
  const onBlogFormSubmit = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  if (user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm onSubmit={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        User {user.name} logged in <button onClick={onLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onSubmit={onBlogFormSubmit} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={(blog) => dispatch(likeBlog(blog))}
          onDelete={(id) => dispatch(deleteBlog(id))}
        />
      ))}
    </div>
  )
}

export default App
