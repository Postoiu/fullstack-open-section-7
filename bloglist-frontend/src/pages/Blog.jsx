import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMatch } from 'react-router-dom'

import blogService from '../services/blogs'
import { useSetNotification } from '../hooks'
import Header from '../components/Header'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Input,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material'

const Blog = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const match = useMatch('/blogs/:id')
  const blog = match && blogs.find((blog) => blog.id === match.params.id)

  const dispatchNotification = useSetNotification()

  const voteMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: (updatedBlog) => {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: `you liked ${updatedBlog.title}`,
          },
        },
        5
      )
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
    onError: (error) => {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: error.response.data.error,
            isError: true,
          },
        },
        5
      )
    },
  })

  const blogCommentMutation = useMutation({
    mutationFn: ({ id, comments }) => {
      return blogService.postComments(id, comments)
    },
    onSuccess: (updatedBlog) => {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: 'comment posted',
          },
        },
        5
      )
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
    onError: (error) => {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: error.response.data.error,
            isError: true,
          },
        },
        5
      )
    },
  })

  const handleLike = (blog) => {
    voteMutation.mutate({ ...blog, likes: blog.likes + 1, user: blog.user.id })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    blogCommentMutation.mutate({
      ...blog,
      comments: blog.comments.concat(comment),
    })
    event.target.comment.value = ''
  }

  return (
    <Container>
      <Header />
      <Card variant='outlined' sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography
            variant='h5'
            gutterBottom
          >{`${blog.title} ${blog.author}`}</Typography>
          <Typography>
            <Link underline='hover' href={blog.url}>
              {blog.url}
            </Link>
          </Typography>
          <Typography>
            {`${blog.likes} likes`}
            <Button
              variant='contained'
              size='small'
              sx={{ padding: 0.01, marginLeft: 1 }}
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
          </Typography>
          <Typography>{`added by ${blog.author}`}</Typography>
        </CardContent>
      </Card>

      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h6'>comments</Typography>
          <form onSubmit={handleSubmit}>
            <Input type='text' name='comment' />
            <Button variant='outlined' size='small' type='submit'>
              add comment
            </Button>
          </form>
          <List>
            {blog.comments.map((comment, i) => (
              <ListItem component={Typography} divider key={i}>
                {comment}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Blog
