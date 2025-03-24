import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import blogService from './services/blogs'
import './index.css'

import { logout, setUser } from './reducers/authReducer'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'

const App = () => {
  const user = useSelector(({ auth }) => auth)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem('loggedBlogsUser')
    )

    if (!user && loggedInUser !== null) {
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }

    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <>
      {user && (
        <Navbar expand='md' bg='primary-subtle' data-bs-theme='light'>
          <Container>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Link className='nav-link' to='/'>
                  home
                </Link>
                <Link className='nav-link' to='/users'>
                  users
                </Link>
              </Nav>
              <Navbar.Text className='ms-auto'>
                <span>
                  {`${user.name} logged in`}
                  <Button
                    variant='primary'
                    className='ms-1'
                    onClick={() => dispatch(logout())}
                  >
                    logout
                  </Button>
                </span>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={user ? <Home /> : <Navigate replace to='/login' />}
        />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate replace to='/login' />}
        />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </>
  )
}

export default App
