import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <Container>
      <Header />

      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}

export default Users
