import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === params.id)
  )

  const user = useSelector((state) => state.user)

  const onBlogDelete = () => {
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

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
    </div>
  )
}

export default Blog
