import { useQueryClient } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'
import Header from '../components/Header'
import { Card, Container, List, ListItem, Typography } from '@mui/material'

const User = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])
  const match = useMatch('/users/:id')
  const user = match && users.find((user) => user.id === match.params.id)

  if (!user) return null

  return (
    <Container>
      <Header />
      <Card variant='outlined' sx={{ padding: 3 }}>
        <Typography variant='h5'>{user.name}</Typography>

        <Card variant='outlined' sx={{ padding: 3, margin: 3 }}>
          <Typography variant='h6'>added blogs</Typography>
          <List>
            {user.blogs.map((blog) => (
              <ListItem divider key={blog.id}>
                {blog.title}
              </ListItem>
            ))}
          </List>
        </Card>
      </Card>
    </Container>
  )
}

export default User
