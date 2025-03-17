import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      likes
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
            type="text"
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            data-testid='author'
            type="text"
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            data-testid='url'
            type="text"
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            data-testid='likes'
            type="number"
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