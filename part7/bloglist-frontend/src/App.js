import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import blogService from './services/blogs'
import {
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog
} from './reducers/blogReducer'
import { loadStoredUser, login, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((b1, b2) => b2.likes - b1.likes)
  )

  // On load - Load user from localStorage
  useEffect(() => {
    dispatch(loadStoredUser())
  }, [dispatch])

  // On load - Fetch blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // On user change - Update blogService auth token
  useEffect(() => {
    if (user) blogService.setToken(user.token)
  }, [user])

  const blogFormRef = useRef()
  const onBlogFormSubmit = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  if (!user) {
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        User {user.name} logged in{' '}
        <button onClick={() => dispatch(logout())}>logout</button>
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
