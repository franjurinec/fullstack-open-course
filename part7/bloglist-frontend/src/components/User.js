import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const params = useParams()

  const user = useSelector((state) =>
    state.users.find((user) => user.id === params.id)
  )

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
