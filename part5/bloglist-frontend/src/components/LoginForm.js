import { useState } from "react"

const LoginForm = ({ onLoginSubmit }) => {

  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  return (
    <form onSubmit={async (event) => {
      event.preventDefault()
      await onLoginSubmit(usernameInput, passwordInput)
      setUsernameInput('')
      setPasswordInput('')
    }}>
      <div>
        username: 
        <input 
          value={usernameInput} 
          onChange={({target}) => setUsernameInput(target.value)} />
      </div>
      <div>
        password: 
        <input 
          value={passwordInput} 
          onChange={({target}) => setPasswordInput(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm