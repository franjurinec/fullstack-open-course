import { useSelector } from 'react-redux'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  const style = {
    display: notifications.length > 0 ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div style={style}>
      {notifications[notifications.length - 1]}
    </div>
  )
}

export default Notification