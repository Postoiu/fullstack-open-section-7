import { useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'
import Header from '../components/Header'
import { Card, Container, ListGroup } from 'react-bootstrap'

const User = () => {
  const users = useSelector(({ users }) => users)
  const match = useMatch('/users/:id')
  const user = match && users.find((user) => user.id === match.params.id)

  if (!user) return null

  return (
    <Container>
      <Header />

      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>added blogs</Card.Subtitle>
          <ListGroup className='mt-3'>
            {user.blogs.map((blog) => (
              <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default User
