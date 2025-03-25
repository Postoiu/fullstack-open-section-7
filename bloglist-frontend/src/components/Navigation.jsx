import { Link as RouterLink } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from '../UserContext'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Link as MuiLink,
} from '@mui/material'

const Navigation = () => {
  const [user, dispatchSetUser] = useContext(UserContext)

  const logout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatchSetUser({ type: 'LOGOUT' })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box component='div' sx={{ flexGrow: 1 }}>
            <MuiLink
              variant='h6'
              color='inherit'
              underline='hover'
              sx={{ padding: 3 }}
              component={RouterLink}
              to='/'
            >
              blogs
            </MuiLink>
            <MuiLink
              variant='h6'
              color='inherit'
              underline='hover'
              sx={{ padding: 2 }}
              component={RouterLink}
              to='/users'
            >
              users
            </MuiLink>
          </Box>
          <Typography variant='h6' component='div'>
            {`${user.name} logged in`}
            <Button
              variant='contained'
              color='secondary'
              size='small'
              sx={{ marginLeft: 2 }}
              onClick={logout}
            >
              logout
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navigation
