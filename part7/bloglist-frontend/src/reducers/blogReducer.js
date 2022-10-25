import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(_, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    addComment(state, action) {
      state
        .find((blog) => blog.id === action.payload.id)
        .comments.push(action.payload.comment)
    },
    incrementLikes(state, action) {
      state.find((blog) => blog.id === action.payload).likes++
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, addBlog, removeBlog, incrementLikes, addComment } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogData) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blogData)
      dispatch(addBlog(newBlog))
      dispatch(
        notify(`A new blog "${blogData.title}" by ${blogData.author} added!`)
      )
    } catch (error) {
      dispatch(notify('Blog creation failed!', 'error'))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.updateBlog(blog.id, { likes: blog.likes + 1 })
      dispatch(incrementLikes(blog.id))
      dispatch(notify(`Liked "${blog.title}" by ${blog.author}!`))
    } catch (error) {
      dispatch(notify('Blog like failed!', 'error'))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(removeBlog(id))
      dispatch(notify('Blog removed successfully!'))
    } catch (error) {
      dispatch(notify('Failed to remove blog!', 'error'))
    }
  }
}

export const commentOnBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      await blogService.comment(id, comment)
      dispatch(addComment({ id, comment }))
      dispatch(notify('Added comment!'))
    } catch (error) {
      dispatch(notify('Failed to comment on blog!', 'error'))
    }
  }
}

export default blogSlice.reducer
