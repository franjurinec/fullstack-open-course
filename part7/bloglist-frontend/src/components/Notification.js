import { Alert, AlertIcon, AlertTitle, Center } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  return (
    <Center position="fixed" top="0" mt="6" w="100vw" pointerEvents="none">
      <Alert variant="solid" status={notification.type} w="xs" rounded="lg">
        <AlertIcon />
        <AlertTitle>{notification.message}</AlertTitle>
      </Alert>
    </Center>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
