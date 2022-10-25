import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'

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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onSubmit={onBlogFormSubmit} />
      </Togglable>
      {blogs.map((blog) => (
        <div className="blog" style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
