import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    dispatch(
      create({
        title,
        author,
        url,
        likes,
      })
    )

    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  return (
    <>
      <h2>create new</h2>
      <Form onSubmit={addBlog} className='mb-3'>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>title</Form.Label>
          <Form.Control
            data-testid='title'
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>author</Form.Label>
          <Form.Control
            data-testid='author'
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>url</Form.Label>
          <Form.Control
            data-testid='url'
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>likes</Form.Label>
          <Form.Control
            data-testid='likes'
            type='number'
            value={likes}
            name='likes'
            onChange={({ target }) => setLikes(parseInt(target.value))}
          />
        </Form.Group>
        <Button variant='primary'>create</Button>
      </Form>
    </>
  )
}

export default BlogForm
