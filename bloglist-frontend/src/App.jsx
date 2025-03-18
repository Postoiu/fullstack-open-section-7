import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import './index.css'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem('loggedBlogsUser')
    )

    if (!user && loggedInUser !== null) {
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)

      dispatch(initializeBlogs())
    }
  }, [user, dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))

    setUsername('')
    setPassword('')
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
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>

      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </div>
  )
}

export default App
