import { useQuery } from '@tanstack/react-query'
import usersService from '../services/users'
import { Link as RouterLink } from 'react-router-dom'
import Header from '../components/Header'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink,
} from '@mui/material'

const Users = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  })

  const users = result.data

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>blog service is not available</div>
  }

  return (
    <Container>
      <Header />
      <Typography variant='h5'>Users</Typography>
      <TableContainer variant={Paper}>
        <Table size='small' sx={{ maxWidth: '50%' }}>
          <TableHead>
            <TableRow>
              <TableCell component='th' scope='row'></TableCell>
              <TableCell component='th' scope='row'>
                blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <MuiLink
                    underline='hover'
                    component={RouterLink}
                    to={`/users/${user.id}`}
                  >
                    {user.name}
                  </MuiLink>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
