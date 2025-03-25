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

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const postComments = async (blogId, comments) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    { comments },
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
