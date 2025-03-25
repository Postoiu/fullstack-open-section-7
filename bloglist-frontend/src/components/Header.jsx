import { Typography } from '@mui/material'
import Notification from './Notification'

const Header = () => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        blogs
      </Typography>
      <Notification />
    </>
  )
}

export default Header
