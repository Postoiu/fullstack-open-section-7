import { Link as RouterLink } from 'react-router-dom'
import { Link as MuiLink } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <>
      <MuiLink
        component={RouterLink}
        underline='hover'
        to={`/blogs/${blog.id}`}
      >
        {blog.title} {blog.author}
      </MuiLink>
    </>
  )
}

export default Blog
