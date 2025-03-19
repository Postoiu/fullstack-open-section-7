import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useSetNotification } from '../hooks'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const queryClient = useQueryClient()
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

  const removeMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (deletedBlogId) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const deletedBlog = blogs.find((b) => b.id === deletedBlogId.id)

      dispatchNotification(
        {
          type: 'SET',
          payload: {
            message: `Blog ${deletedBlog.title} by ${deletedBlog.author} removed`,
          },
        },
        5
      )

      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== deletedBlogId.id)
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

  const handleRemove = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    removeMutation.mutate(blog)
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      <div className='header'>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div className='collapsed'>
          <div>{blog.url}</div>
          <div>
            {`likes ${blog.likes}`}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            {currentUser.username === blog.user.username && (
              <button onClick={() => handleRemove(blog)}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
