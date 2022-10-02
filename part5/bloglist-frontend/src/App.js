import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [user, setUser] = useState(undefined)

  const [blogs, setBlogs] = useState([])

  const onLoginSubmit = async (username, password) => {
    const result = await loginService.login(username, password)
    setUser(result)
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  if (user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
          <LoginForm {...{onLoginSubmit}} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>User {user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
