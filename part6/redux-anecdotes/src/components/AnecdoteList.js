import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({anecdotes, filter}) => [...anecdotes]
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes))

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList