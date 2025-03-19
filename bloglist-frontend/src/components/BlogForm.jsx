import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { useSetNotification } from '../hooks'

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
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    },
    onErorr: (error) => {
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
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid='title'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='author'
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='url'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            data-testid='likes'
            type='number'
            value={likes}
            name='likes'
            onChange={({ target }) => setLikes(parseInt(target.value))}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
