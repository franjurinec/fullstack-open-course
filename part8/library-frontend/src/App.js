import { useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [page, setPage] = useState('authors')

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} loggedIn={!!token} />

      <Books show={page === 'books'} />

      <Recommended show={page === 'recommended'} />

      <NewBook show={page === 'add'} />

      <Login
        show={page === 'login'}
        setToken={setToken}
        visitHomepage={() => setPage('books')}
      />
    </div>
  )
}

export default App
