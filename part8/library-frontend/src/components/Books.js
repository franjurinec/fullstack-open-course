import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { BOOKS_AND_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(BOOKS_AND_GENRES, {
    variables: { genre },
    fetchPolicy: 'cache-and-network'
  })

  if (!props.show) return null
  return (
    <div>
      <h2>books</h2>

      {result.loading ? (
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
              {result.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {result.data.allGenres.map((genre) => (
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
