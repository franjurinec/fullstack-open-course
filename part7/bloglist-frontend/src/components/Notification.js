import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (!message) return null

  const notificationStyle = {
    display: 'inline-block',
    color: type === 'error' ? 'red' : 'green',
    fontSize: 16,
    fontWeight: 'bold',
    border: 2,
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 2,
    margin: 4,
  }

  return <div style={notificationStyle}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default Notification
