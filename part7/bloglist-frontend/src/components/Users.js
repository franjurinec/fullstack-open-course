import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Link
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Link as RouteLink } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <VStack spacing="4" alignItems="start">
      <Heading color="gray.600" size="xl">
        Users
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th />
              <Th>Blogs Created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Link as={RouteLink} to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </Td>
                <Td>{user.blogs.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export default Users
