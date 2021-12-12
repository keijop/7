import axios from 'axios'

export const getComments = async blogId => {
  const response = await axios.get(`/api/blogs/${blogId}/comments`)
  return response.data.comments
}

export const postComment = async (blogId, body) => {
  const url = `/api/blogs/${blogId}/comments`
  const response = await axios.post(url, { content: body })
  return response.data.comment
}
