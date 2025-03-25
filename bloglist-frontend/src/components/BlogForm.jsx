import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useSetNotification } from '../hooks'
import {
  Box,
  Button,
  FormGroup,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const queryClient = useQueryClient()
  const dispatchNotification = useSetNotification()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
          },
        },
        5
      )
      // const blogs = queryClient.getQueryData(['blogs'])
      // queryClient.setQueryData(['blogs'], (blogs = []) => [...blogs, newBlog])
      queryClient.invalidateQueries(['blogs'])
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

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    newBlogMutation.mutate({
      title,
      author,
      url,
      likes,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <>
      <Typography variant='h5' gutterBottom>
        create new
      </Typography>
      <Box component='form' onSubmit={addBlog} sx={{ maxWidth: '50%' }}>
        <FormGroup>
          <InputLabel htmlFor='title'>title</InputLabel>
          <Input
            data-testid='title'
            type='text'
            value={title}
            name='title'
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor='author'>author</InputLabel>
          <Input
            data-testid='author'
            type='text'
            value={author}
            name='author'
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor='url'>url</InputLabel>
          <Input
            data-testid='url'
            type='text'
            value={url}
            name='url'
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormGroup>
        <FormGroup>
          <InputLabel htmlFor='likes'>likes</InputLabel>
          <Input
            data-testid='likes'
            type='number'
            value={likes}
            name='likes'
            id='likes'
            onChange={({ target }) => setLikes(parseInt(target.value))}
          />
        </FormGroup>
        <Button
          variant='contained'
          size='small'
          type='submit'
          sx={{ margin: '10px 0' }}
        >
          create
        </Button>
      </Box>
    </>
  )
}

export default BlogForm
