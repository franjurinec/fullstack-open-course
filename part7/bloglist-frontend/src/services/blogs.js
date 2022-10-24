import axios from 'axios'
const baseUrl = '/api/blogs'

let token = undefined

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createBlog = async (blogData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const updateBlog = async (id, blogData) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, blogData, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const blogService = { getAll, createBlog, updateBlog, deleteBlog, setToken }

export default blogService
