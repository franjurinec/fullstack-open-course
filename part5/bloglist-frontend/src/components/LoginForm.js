import { useState } from "react"

const LoginForm = ({ onSubmit }) => {

  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  return (
    <form onSubmit={async (event) => {
      event.preventDefault()
      await onSubmit(usernameInput, passwordInput)
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
          type="password"
          value={passwordInput} 
          onChange={({target}) => setPasswordInput(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm