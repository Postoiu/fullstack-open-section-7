import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

export const { setUsers } = usersReducer.actions

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersReducer.reducer
