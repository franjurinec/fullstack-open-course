import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {

  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={async (event) => {
        event.preventDefault()
        await onSubmit(titleInput, authorInput, urlInput)
        setTitleInput('')
        setAuthorInput('')
        setUrlInput('')
      }}>
        <div>
          title:
          <input
            value={titleInput}
            onChange={({ target }) => setTitleInput(target.value)} />
        </div>
        <div>
          author:
          <input
            value={authorInput}
            onChange={({ target }) => setAuthorInput(target.value)} />
        </div>
        <div>
          url:
          <input
            value={urlInput}
            onChange={({ target }) => setUrlInput(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func
}

export default BlogForm