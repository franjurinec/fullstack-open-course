import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })
  
  if (!response.status === 200) {
    console.log('Login error.')
    return undefined 
  }
  
  return response.data
}

const loginService = { login }

export default loginService