import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { remove, vote } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

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
            <button onClick={() => dispatch(vote(blog))}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            {currentUser.username === blog.user.username && (
              <button onClick={() => dispatch(remove(blog))}>remove</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
