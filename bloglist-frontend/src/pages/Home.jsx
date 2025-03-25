import { useQuery, useQueryClient } from '@tanstack/react-query'
import BlogForm from '../components/BlogForm'
import Toggable from '../components/Toggable'
import Blog from '../components/Blog'
import { useEffect, useRef } from 'react'
import Header from '../components/Header'
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import blogService from '../services/blogs'

const Home = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogs = result.data

  const blogFormRef = useRef()

  if (result.isLoading) return <div>Loading...</div>

  if (result.isError) return <div>Blogs service unavailable</div>

  return (
    <Container>
      <Header />
      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <TableRow key={blog.id} hover>
                  <TableCell>
                    <Blog blog={blog} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Home
