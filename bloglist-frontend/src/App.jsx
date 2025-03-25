import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Navigate, Route, Routes } from 'react-router-dom'

import blogService from './services/blogs'

import UserContext from './UserContext'

import Header from './components/Header'

import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import User from './pages/User'
import Blog from './pages/Blog'

import './index.css'
import Navigation from './components/Navigation.jsx'

const App = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const [user, dispatchSetUser] = useContext(UserContext)

  useEffect(() => {
    const loggedInUser = JSON.parse(
      window.localStorage.getItem('loggedBlogsUser')
    )

    if (!user && loggedInUser !== null) {
      dispatchSetUser({ type: 'LOGIN', payload: loggedInUser })
      blogService.setToken(loggedInUser.token)
    }
  }, [user, dispatchSetUser])

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service is not available</div>
  }

  return (
    <>
      {user && <Navigation />}
      <Routes>
        <Route
          path='/'
          element={user ? <Home /> : <Navigate to='/login' replace />}
        />
        <Route
          path='/users'
          element={user ? <Users /> : <Navigate to='/login' replace />}
        />
        <Route path='/users/:id' element={<User />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
