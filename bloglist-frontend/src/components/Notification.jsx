import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector(({ notification }) => notification)

  if (message === null) {
    return null
  }

  return <div className={`notification ${isError && 'error'}`}>{message}</div>
}

export default Notification
