import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    submitVote(state, action) {
      state.find(anecdote => anecdote.id === action.payload).votes++
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { submitVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer