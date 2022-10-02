const LoginForm = (
  {
    onLoginSubmit,
    usernameInput,
    onUsernameInputChange,
    passwordInput,
    onPasswordInputChange
  }
) => {
  return (
    <form onSubmit={onLoginSubmit}>
      <div>username: <input value={usernameInput} onChange={onUsernameInputChange} /></div>
      <div>password: <input value={passwordInput} onChange={onPasswordInputChange} /></div>
      <div><button type="submit">login</button></div>
    </form>
  )
}

export default LoginForm