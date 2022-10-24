import { useState, useEffect, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  const sortedBlogs = useMemo(
    () => [...blogs].sort((b1, b2) => b2.likes - b1.likes),
    [blogs]
  )

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

  const onBlogCreate = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createBlog({ title, author, url })
      setBlogs(blogs.concat(result))
      dispatch(notify(`A new blog "${title}" by ${author} added!`))
    } catch (error) {
      dispatch(notify('Blog creation failed!', 'error'))
    }
  }

  const onBlogLike = async (blogData) => {
    try {
      const blogsCopy = [...blogs]
      blogsCopy.find((blog) => blog.id === blogData.id).likes += 1
      setBlogs(blogsCopy)
      // NOTE - While the instructions mentioned sending all data back to the server, sending only a specific field e.g. likes works with the current backend implementation.
      await blogService.updateBlog(blogData.id, { likes: blogData.likes + 1 })
      dispatch(notify(`Liked "${blogData.title}" by ${blogData.author}!`))
    } catch (error) {
      dispatch(notify('Blog like failed!', 'error'))
    }
  }

  const onBlogDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
      dispatch(notify('Blog removed successfully!'))
    } catch (error) {
      dispatch(notify('Failed to remove blog!', 'error'))
    }
  }

  // On load - Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
      } catch (error) {
        dispatch(notify('Failed to fetch blogs!', 'error'))
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
    if (user) blogService.setToken(user.token)
  }, [user])

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
        <BlogForm onSubmit={onBlogCreate} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onBlogLike}
          onDelete={onBlogDelete}
        />
      ))}
    </div>
  )
}

export default App
