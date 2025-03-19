import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import { useSetNotification } from './hooks'
import { useQuery } from '@tanstack/react-query'
import UserContext from './UserContext'

const App = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogs = result.data

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, dispatchSetUser] = useContext(UserContext)

  const dispatchNotification = useSetNotification()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem('loggedBlogsUser')
    )

    if (!user && loggedInUser !== null) {
      dispatchSetUser({ type: 'LOGIN', payload: loggedInUser })
      blogService.setToken(loggedInUser.token)
    }
  }, [])

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

  const logout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatchSetUser({ type: 'LOGOUT' })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service is not available</div>
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type='password'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {`${user.name} logged in`}
        <button onClick={logout}>logout</button>
      </p>
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} currentUser={user} />
        ))}
    </div>
  )
}

export default App
