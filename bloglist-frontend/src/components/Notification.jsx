import { Alert } from '@mui/material'
import { useNotification } from '../hooks'

const Notification = () => {
  const { message, isError } = useNotification()

  if (message === null) {
    return null
  }

  return (
    <Alert severity={isError ? 'error' : 'success'} sx={{ marginBottom: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification
