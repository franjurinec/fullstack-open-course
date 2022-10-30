import { useQuery } from '@apollo/client'
import { BOOKS_AND_GENRES, FAVOURITE_GENRE } from '../queries'

const Recommended = (props) => {
  const userResult = useQuery(FAVOURITE_GENRE)

  const genre =
    userResult.loading || !userResult.data.me
      ? null
      : userResult.data.me.favouriteGenre

  const result = useQuery(BOOKS_AND_GENRES, {
    variables: {
      genre
    },
    fetchPolicy: 'cache-and-network'
  })

  if (!props.show) return null
  return (
    <div>
      <h2>recommendations</h2>

      {userResult.loading || result.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          books in your favourite genre <b>{genre}</b>
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
        </div>
      )}
    </div>
  )
}

export default Recommended
