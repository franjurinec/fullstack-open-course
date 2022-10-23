import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

let timeoutID
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(addNotification(notification))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer