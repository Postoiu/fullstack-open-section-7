import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import { useContext, useEffect, useState } from 'react'
import { useSetNotification, useSetUser } from '../hooks'
import UserContext from '../UserContext'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
} from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, dispatchSetUser] = useContext(UserContext)

  const dispatchNotification = useSetNotification()
  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      dispatchSetUser({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    } catch (exception) {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: exception.response.data.error,
            isError: true,
          },
        },
        5
      )
    }

    setUsername('')
    setPassword('')
  }

  return (
    <Container maxWidth='sm'>
      <h2>Log in to application</h2>
      <Notification />
      <form
        onSubmit={handleLogin}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <FormControl>
          <InputLabel>username</InputLabel>
          <Input
            data-testid='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel>password</InputLabel>
          <Input
            data-testid='password'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </FormControl>
        <Button variant='contained' type='submit'>
          login
        </Button>
      </form>
    </Container>
  )
}

export default Login
