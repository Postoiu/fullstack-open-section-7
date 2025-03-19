import { useNotification } from '../hooks'

const Notification = () => {
  const { message, isError } = useNotification()

  if (message === null) {
    return null
  }

  return <div className={`notification ${isError && 'error'}`}>{message}</div>
}

export default Notification
