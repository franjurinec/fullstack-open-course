import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'
import { useState } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [authorInput, setAuthorInput] = useState(null)
  const [birthyearInput, setBirthyearInput] = useState('')

  const onSetBirthyear = (e) => {
    e.preventDefault()
    editAuthor({
      variables: { name: authorInput.value, setBornTo: Number(birthyearInput) }
    })
    setBirthyearInput('')
    setAuthorInput(null)
  }

  if (!props.show) return null
  return (
    <div>
      <h2>authors</h2>
      {result.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {result.data.allAuthors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Set birthyear</h3>
          <form onSubmit={onSetBirthyear}>
            <Select
              value={authorInput}
              onChange={setAuthorInput}
              options={result.data.allAuthors.map(({ name }) => ({
                value: name,
                label: name
              }))}
            />
            <div>
              born
              <input
                type='number'
                value={birthyearInput}
                onChange={(e) => setBirthyearInput(e.target.value)}
              ></input>
            </div>
            <button>update author</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Authors
