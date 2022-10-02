import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])

  const onUsernameInputChange = (event) => setUsernameInput(event.target.value)
  const onPasswordInputChange = (event) => setPasswordInput(event.target.value)

  const onLoginSubmit = async (event) => {
    event.preventDefault()

    loginService.login(usernameInput, passwordInput)
      .then(result => {
        setUser(result)
        setUsernameInput("")
        setPasswordInput("")
      })
  }

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs( blogs ))  
  }, [])

  if (user === undefined) {
    return (
      <div>
        <h2>Log in to application</h2>
          <LoginForm {...{onLoginSubmit, usernameInput, onUsernameInputChange, passwordInput, onPasswordInputChange}} />
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
