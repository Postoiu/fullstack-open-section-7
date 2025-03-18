import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  isError: false,
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotificationMsg(state, action) {
      return action.payload
    },
  },
})

export const { setNotificationMsg } = notificationReducer.actions

export const setNotification = (notificationObj, timeout) => {
  return (dispatch) => {
    dispatch(setNotificationMsg(notificationObj))

    setTimeout(() => {
      dispatch(setNotificationMsg({ message: null, isError: false }))
    }, timeout * 1000)
  }
}

export default notificationReducer.reducer
