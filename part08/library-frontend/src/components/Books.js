import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_GENRES, BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const genresResult = useQuery(ALL_GENRES)

  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  if (!props.show) return null
  return (
    <div>
      <h2>books</h2>

      {booksResult.loading || genresResult.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          in genre <b>{genre ?? 'any'}</b>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {booksResult.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {genresResult.data.allGenres.map((genre) => (
            <button key={genre} onClick={() => setGenre(genre)}>
              {genre}
            </button>
          ))}
          <button onClick={() => setGenre(null)}>all genres</button>
        </div>
      )}
    </div>
  )
}

export default Books
