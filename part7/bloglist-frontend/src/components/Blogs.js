import { Box, Heading, VStack, Link, Divider } from '@chakra-ui/react'
import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouteLink } from 'react-router-dom'
import { createBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(({ blogs }) =>
    [...blogs].sort((b1, b2) => b2.likes - b1.likes)
  )

  const blogFormRef = useRef()
  const onBlogFormSubmit = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  return (
    <VStack spacing="4" alignItems="start">
      <Heading color="gray.600" size="xl">
        Blogs
      </Heading>
      <Box w="full">
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm onSubmit={onBlogFormSubmit} />
        </Togglable>
      </Box>

      <Divider my="4" borderColor="gray.600" />

      {blogs.map((blog) => (
        <Box className="blog" key={blog.id}>
          <Link as={RouteLink} to={`/blogs/${blog.id}`}>
            <Heading size="md">
              {blog.title} {blog.author}
            </Heading>
          </Link>
        </Box>
      ))}

      <Divider my="4" borderColor="gray.600" />
    </VStack>
  )
}

export default Blogs
