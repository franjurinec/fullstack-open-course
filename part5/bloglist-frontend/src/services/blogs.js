import axios from 'axios'
const baseUrl = '/api/blogs'

let token = undefined

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = async blogData => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const blogService = { getAll, createBlog, setToken }

export default blogService