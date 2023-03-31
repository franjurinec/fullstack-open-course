import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

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
      <VStack spacing="5">
        <FormControl>
          <FormLabel>Username:</FormLabel>
          <Input
            id="username"
            value={usernameInput}
            onChange={({ target }) => setUsernameInput(target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password:</FormLabel>
          <Input
            id="password"
            type="password"
            value={passwordInput}
            onChange={({ target }) => setPasswordInput(target.value)}
          />
        </FormControl>
        <Button id="login-button" type="submit" w="100%">
          Login
        </Button>
      </VStack>
    </form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func
}

export default LoginForm
