import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit }) => {
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        await onSubmit(usernameInput, passwordInput)
        setUsernameInput('')
        setPasswordInput('')
      }}
    >
      <div>
        username:
        <input
          id="username"
          value={usernameInput}
          onChange={({ target }) => setUsernameInput(target.value)}
        />
      </div>
      <div>
        password:
        <input
          id="password"
          type="password"
          value={passwordInput}
          onChange={({ target }) => setPasswordInput(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default LoginForm
