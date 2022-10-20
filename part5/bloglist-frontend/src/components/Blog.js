import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onLike, onDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(e => !e)

  if (!expanded) return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleExpanded}>show</button>
    </div>
  )

  return (
    <div className='blog' style={blogStyle}>
      <div>{blog.title} {blog.author} <button onClick={toggleExpanded}>hide</button></div>
      <div>{blog.url}</div>
      <div>{`likes ${blog.likes}`} <button onClick={() => onLike(blog)}>like</button></div>
      <div>{blog.user.name}</div>
      <div><button onClick={() => onDelete(blog.id)}>remove</button></div>
    </div>
  )
}

Blog.propTypes = {
  onLike: PropTypes.func,
  onDelete: PropTypes.func,
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({ name: PropTypes.string })
  })
}

export default Blog