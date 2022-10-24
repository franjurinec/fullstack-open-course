import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onSubmit }) => {
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          await onSubmit(titleInput, authorInput, urlInput)
          setTitleInput('')
          setAuthorInput('')
          setUrlInput('')
        }}
      >
        <div>
          title:
          <input
            id="title"
            value={titleInput}
            placeholder="Enter Title"
            onChange={({ target }) => setTitleInput(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={authorInput}
            placeholder="John Doe"
            onChange={({ target }) => setAuthorInput(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={urlInput}
            placeholder="http://example.url.com"
            onChange={({ target }) => setUrlInput(target.value)}
          />
        </div>
        <button id="blog-submit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default BlogForm
