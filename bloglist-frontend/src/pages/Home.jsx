import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Toggable from '../components/Toggable'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import Header from '../components/Header'
import { initializeBlogs } from '../reducers/blogReducer'
import { Container, Table } from 'react-bootstrap'

const Home = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(({ blogs }) => blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <Container>
      <Header />

      <Table striped hover>
        <tbody>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>

      <Toggable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Toggable>
    </Container>
  )
}

export default Home
