import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [isError, setIsError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem('loggedBlogsUser')
    )

    if (!user && loggedInUser !== null) {
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      setNotificationMsg(exception.response.data.error)
      setIsError(true)
    }

    setUsername('')
    setPassword('')

    setTimeout(() => {
      setNotificationMsg(null)
      setIsError(false)
    }, 5000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(addedBlog).sort((a, b) => b.likes - a.likes))
      setNotificationMsg(
        `a new blog ${addedBlog.title} by ${addedBlog.author} added`
      )
    } catch (exception) {
      setNotificationMsg(exception.response.data.error)
      setIsError(true)
    }

    setTimeout(() => {
      setNotificationMsg(null)
      setIsError(false)
    }, 5000)
  }

  const updateBlog = async (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId)

    const updatedBlog = await blogService.updateBlog(blogToUpdate.id, {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id,
    })

    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
  }

  const removeBlog = async (blogId) => {
    const blogToDelete = blogs.find((blog) => blog.id === blogId)

    if (
      !window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      return
    }

    try {
      const deletedBlogId = await blogService.deleteBlog(blogToDelete.id)

      setNotificationMsg(
        `Blog ${blogToDelete.title} by ${blogToDelete.author} removed`
      )
      setBlogs(blogs.filter((b) => b.id !== deletedBlogId.id))
    } catch (exception) {
      console.log(exception)
      setNotificationMsg(exception.response.data.error)
      setIsError(true)
    }

    setTimeout(() => {
      setNotificationMsg(null)
      setIsError(false)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMsg} isError={isError} />
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
      <Notification message={notificationMsg} isError={isError} />
      <p>
        {`${user.name} logged in`}
        <button onClick={logout}>logout</button>
      </p>

      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Toggable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          currentUser={user}
          onUpdate={updateBlog}
          onRemove={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
