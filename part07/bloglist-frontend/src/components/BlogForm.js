import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react'

const BlogForm = ({ onSubmit }) => {
  const [titleInput, setTitleInput] = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  return (
    <Box>
      <Heading size="md">Create New</Heading>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          await onSubmit({
            title: titleInput,
            author: authorInput,
            url: urlInput
          })
          setTitleInput('')
          setAuthorInput('')
          setUrlInput('')
        }}
      >
        <VStack spacing="2" alignItems="start" w="md" py="2">
          <FormControl>
            <FormLabel>Title:</FormLabel>
            <Input
              id="title"
              value={titleInput}
              placeholder="Enter Title"
              onChange={({ target }) => setTitleInput(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Author:</FormLabel>
            <Input
              id="author"
              value={authorInput}
              placeholder="John Doe"
              onChange={({ target }) => setAuthorInput(target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>URL:</FormLabel>
            <Input
              id="url"
              value={urlInput}
              placeholder="http://example.url.com"
              onChange={({ target }) => setUrlInput(target.value)}
            />
          </FormControl>
          <Button id="blog-submit" type="submit">
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func
}

export default BlogForm
