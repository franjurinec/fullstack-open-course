import {
  VStack,
  Heading,
  Divider,
  Link,
  Text,
  Button,
  HStack,
  Input,
  Box,
  Flex,
  UnorderedList,
  ListItem
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { commentOnBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const params = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [commentInput, setCommentInput] = useState('')

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === params.id)
  )

  const user = useSelector((state) => state.user)

  const onBlogDelete = () => {
    dispatch(deleteBlog(blog.id))
    navigate('/')
  }

  const onComment = (e) => {
    e.preventDefault()
    dispatch(commentOnBlog(blog.id, commentInput))
    setCommentInput('')
  }

  if (!blog) return null

  return (
    <VStack spacing="4" alignItems="start">
      <Heading color="gray.600" size="xl">
        {blog.title} {blog.author}
      </Heading>
      <Text fontSize="lg">
        More info: <Link isExternal>{blog.url}</Link>
      </Text>

      <Divider my="4" borderColor="gray.600" />

      <Flex w="full" justifyContent="space-between">
        <HStack spacing="4">
          <Text fontSize="xl">
            {blog.likes} {'like(s)'}
          </Text>
          <Button onClick={() => dispatch(likeBlog(blog))}>Like</Button>
        </HStack>
        <Text fontSize="2xl">Added by {blog.user.name}</Text>
        <Box>
          {blog.user.username === user.username && (
            <Button onClick={onBlogDelete}>Remove Blog</Button>
          )}
        </Box>
      </Flex>

      <Divider my="4" borderColor="gray.600" />

      <Heading size="md">Comments:</Heading>
      <form onSubmit={onComment}>
        <VStack spacing="2" alignItems="start">
          <Input
            placeholder="Comment here..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          ></Input>
          <Button type="submit">Add Comment</Button>
        </VStack>
      </form>
      <UnorderedList>
        {blog.comments.map((comment, idx) => (
          <ListItem listStylePos="inside" key={idx}>
            {comment}
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  )
}

export default Blog
