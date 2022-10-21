import { useSelector, useDispatch } from 'react-redux'
import { submitVote } from '../reducers/anecdoteReducer'
import { addNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({anecdotes, filter}) => [...anecdotes]
    .filter(anecdote => anecdote.content.includes(filter))
    .sort((a, b) => b.votes - a.votes))

  const vote = id => {
    console.log('vote', id)
    dispatch(submitVote(id))
    dispatch(addNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
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