import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink
} from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStoredUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import {
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  Link,
  Container
} from '@chakra-ui/react'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(loadStoredUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return user ? (
    <Router>
      <Flex
        p="4"
        color="gray.100"
        backgroundColor="gray.600"
        position="sticky"
        top="0"
        justifyContent="space-between"
      >
        <HStack spacing="4">
          <Heading size="lg" mr="4">
            Blog App
          </Heading>
          <Link as={RouteLink} to="/">
            <Text fontSize="xl">Blogs</Text>
          </Link>
          <Link as={RouteLink} to="/users">
            <Text fontSize="xl">Users</Text>
          </Link>
        </HStack>
        <HStack spacing="4">
          <Text>{user.name} logged in</Text>
          <Button color="gray.600" onClick={() => dispatch(logout())}>
            Log out
          </Button>
        </HStack>
      </Flex>
      <Container maxW="container.lg" p="12">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Container>
      <Notification />
    </Router>
  ) : (
    <Login />
  )
}

export default App
