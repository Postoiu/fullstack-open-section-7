import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
})

export const { setUser } = userReducer.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
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

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(setUser(null))
  }
}

export default userReducer.reducer
