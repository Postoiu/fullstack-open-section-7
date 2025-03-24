import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (blogId, update) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.put(`${baseUrl}/${blogId}`, update, config)
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const postComments = async (blogId, update) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    update,
    config
  )
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  updateBlog,
  deleteBlog,
  postComments,
}
