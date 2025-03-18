import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    },
    deleteBlog: (state, action) => {
      const { id } = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const create = (blogData) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogData)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(
          {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          },
          5
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            isError: true,
          },
          5
        )
      )
    }
  }
}

export const vote = (blogToUpdate) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(blogToUpdate.id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1,
        user: blogToUpdate.user.id,
      })

      dispatch(updateBlog(updatedBlog))
      dispatch(
        setNotification({ message: `you voted for ${blogToUpdate.title}` }, 5)
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            isError: true,
          },
          5
        )
      )
    }
  }
}

export const remove = (blogToDelete) => {
  return async (dispatch) => {
    if (
      !window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      return
    }

    try {
      const deletedBlogId = await blogService.deleteBlog(blogToDelete.id)

      dispatch(deleteBlog(deletedBlogId))
      dispatch(
        setNotification(
          {
            message: `Blog ${blogToDelete.title} by ${blogToDelete.author} removed`,
          },
          5
        )
      )
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            isError: true,
          },
          5
        )
      )
    }
  }
}

export default blogReducer.reducer
