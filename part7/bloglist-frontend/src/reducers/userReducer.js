import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { notify } from './notificationReducer'

const USER_KEY = 'loggedBloglistUser'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
    unsetUser() {
      return initialState
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const loadStoredUser = () => {
  return (dispatch) => {
    const loggedUserJSON = localStorage.getItem(USER_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      localStorage.setItem(USER_KEY, JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(notify(`Logged in as ${user.name}!`))
    } catch (error) {
      dispatch(notify('Wrong username or password!', 'error'))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem(USER_KEY)
    dispatch(unsetUser())
    dispatch(notify('Logged out!'))
  }
}

export default userSlice.reducer
