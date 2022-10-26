import {
  VStack,
  Heading,
  UnorderedList,
  ListItem,
  Link
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link as RouteLink, useParams } from 'react-router-dom'

const User = () => {
  const params = useParams()

  const user = useSelector((state) =>
    state.users.find((user) => user.id === params.id)
  )

  if (!user) return null

  return (
    <VStack spacing="4" alignItems="start">
      <Heading color="gray.600" size="xl">
        {user.name}
      </Heading>
      <Heading size="md">Added Blogs</Heading>
      <UnorderedList listStylePos="inside">
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link as={RouteLink} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </VStack>
  )
}

export default User
