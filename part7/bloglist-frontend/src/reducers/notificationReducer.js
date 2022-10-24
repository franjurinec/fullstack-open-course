import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

let timeoutID
export const notify = (notification, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer
