import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { commentOnBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [commentInput, setCommentInput] = useState('')

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === params.id)
  )

  const user = useSelector((state) => state.user)

  const onBlogDelete = () => {
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  const onComment = (e) => {
    e.preventDefault()
    dispatch(commentOnBlog(blog.id, commentInput))
    setCommentInput('')
  }

  if (!blog) return null

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {blog.user.username === user.username && (
        <div>
          <button onClick={onBlogDelete}>remove</button>
        </div>
      )}
      <h4>comments</h4>
      <form onSubmit={onComment}>
        <input
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></input>
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
