import axios from 'axios'
const baseUrl = '/api/blogs/'

const setToken = newToken => {
  return `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const data = response.data
  const sortedData = data.sort((a, b) => b.likes - a.likes)
  return sortedData
}

const postBlog = async (body, token) => {
  const config = { headers: { Authorization: setToken(token) } }
  const response = await axios.post(baseUrl, body, config)
  return response
}

const updateBlog = async (id, body) => {
  const response = await axios.patch(baseUrl + id, body)
  return response
}

const removeBlog = async (id, token) => {
  const config = { headers: { Authorization: setToken(token) } }
  const response = await axios.delete(baseUrl + id, config)
  return response
}

export default { getAll, postBlog, updateBlog, setToken, removeBlog }
