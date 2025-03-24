import { useState } from 'react'
import Notification from '../components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/authReducer'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    await dispatch(login({ username, password }))
    navigate('/')

    setUsername('')
    setPassword('')
  }

  return (
    <div className='container mt-5 p-5 bg-primary-subtle'>
      <h2>Log in to application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-testid='username'
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid='password'
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          login
        </Button>
      </Form>
    </div>
  )
}

export default Login
