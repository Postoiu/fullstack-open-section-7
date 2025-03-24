import { Alert, Toast } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector(({ notification }) => notification)

  if (message === null) {
    return null
  }

  // return <div className={`notification ${isError && 'error'}`}>{message}</div>
  return (
    <Alert className='mt-3' variant={isError ? 'danger' : 'success'}>
      {message}
    </Alert>
  )
}

export default Notification
