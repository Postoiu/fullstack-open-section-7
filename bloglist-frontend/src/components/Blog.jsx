import { useState } from 'react'

const Blog = ({
  blog,
  currentUser,
  onUpdate,
  onRemove
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      <div className='header'>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      </div>
      {
        showDetails &&
        <div className='collapsed'>
          <div>
            {blog.url}
          </div>
          <div>
            {`likes ${blog.likes}`}
            <button onClick={() => onUpdate(blog.id)}>like</button>
          </div>
          <div>
            {blog.user.name}
          </div>
          <div>
            {
              currentUser.username === blog.user.username &&
              <button onClick={() => onRemove(blog.id)}>remove</button>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Blog