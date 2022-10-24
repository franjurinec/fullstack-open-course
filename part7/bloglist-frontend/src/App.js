import { useState, useEffect, useRef, useMemo } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState([])

  const blogFormRef = useRef()

  const sortedBlogs = useMemo(
    () => [...blogs].sort((b1, b2) => b2.likes - b1.likes),
    [blogs]
  )

  let timeoutID
  const notify = (message, type = 'info') => {
    clearTimeout(timeoutID)
    timeoutID = setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const onLogin = async (username, password) => {
    try {
      const result = await loginService.login(username, password)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(result))
      setUser(result)
      notify(`Logged in as ${result.name}!`)
    } catch (error) {
      notify('Wrong username or password!', 'error')
    }
  }

  const onLogout = async () => {
    setUser(undefined)
    window.localStorage.removeItem('loggedBloglistUser')
    notify('Logged out!')
  }

  const onBlogCreate = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createBlog({ title, author, url })
      setBlogs(blogs.concat(result))
      notify(`A new blog "${title}" by ${author} added!`)
    } catch (error) {
      notify('Blog creation failed!', 'error')
    }
  }

  const onBlogLike = async (blogData) => {
    try {
      const blogsCopy = [...blogs]
      blogsCopy.find((blog) => blog.id === blogData.id).likes += 1
      setBlogs(blogsCopy)
      // NOTE - While the instructions mentioned sending all data back to the server, sending only a specific field e.g. likes works with the current backend implementation.
      await blogService.updateBlog(blogData.id, { likes: blogData.likes + 1 })
      notify(`Liked "${blogData.title}" by ${blogData.author}!`)
    } catch (error) {
      notify('Blog like failed!', 'error')
    }
  }

  const onBlogDelete = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== id))
      notify('Blog removed successfully!')
    } catch (error) {
      notify('Failed to remove blog!', 'error')
    }
  }

  // On load - Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const newBlogs = await blogService.getAll()
        setBlogs(newBlogs)
      } catch (error) {
        notify('Failed to fetch blogs!', 'error')
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
        <Notification {...notification} />
        <LoginForm onSubmit={onLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notification} />
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
