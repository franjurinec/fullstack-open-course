import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const notificationStyle = {
    display: 'inline-block',
    color: notification.type === 'error' ? 'red' : 'green',
    fontSize: 16,
    fontWeight: 'bold',
    border: 2,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 2,
    margin: 4
  }

  return <div style={notificationStyle}>{notification.message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
