import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.push(action.payload)
    },
    removeNotification(state) {
      return state.slice(1)
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(addNotification(notification))
    setTimeout(() => dispatch(removeNotification()), timeout * 1000)
  }
}

export default notificationSlice.reducer