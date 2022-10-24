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
export const notify = (message, type = 'info') => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => dispatch(clearNotification()), 5000)
  }
}

export default notificationSlice.reducer
