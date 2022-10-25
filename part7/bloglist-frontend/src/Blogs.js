import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const Blogs = () => {
  const dispatch = useDispatch()

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
