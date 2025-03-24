import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import Header from '../components/Header'
import { addComment, vote } from '../reducers/blogReducer'
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
} from 'react-bootstrap'

const Blog = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const match = useMatch('/blogs/:id')
  const blog = match && blogs.find((blog) => blog.id === match.params.id)

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addComment(blog, comment))
    event.target.comment.value = ''
  }

  return (
    <Container>
      <Header />

      <Card className='mb-3'>
        <Card.Body>
          <Card.Title>
            {blog.title} {blog.author}
          </Card.Title>
          <Card.Text>
            <Card.Link href={blog.url}>{blog.url}</Card.Link>
          </Card.Text>
          <Card.Text>
            <span>
              {`${blog.likes} likes`}
              <Button
                variant='outline-primary'
                size='sm'
                className='ms-2'
                onClick={() => dispatch(vote(blog))}
              >
                like
              </Button>
            </span>
          </Card.Text>
          <Card.Text>added by {blog.user.name}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>comments</Card.Title>
          <Form onSubmit={handleSubmit} className='mb-3'>
            <Row>
              <Col>
                <Form.Control type='text' name='comment' />
              </Col>
              <Col>
                <Button variant='outline-primary' type='submit'>
                  add comment
                </Button>
              </Col>
            </Row>
          </Form>
          <ListGroup>
            {blog.comments.map((comment, i) => (
              <ListGroup.Item key={i}>
                <em>{comment}</em>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Blog
