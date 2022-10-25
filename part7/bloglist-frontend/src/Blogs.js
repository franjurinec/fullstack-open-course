import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'
import Notification from './components/Notification'
import { logout } from './reducers/userReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((b1, b2) => b2.likes - b1.likes)
  )

  const blogFormRef = useRef()
  const onBlogFormSubmit = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        User {user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </div>
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

export default Blogs
