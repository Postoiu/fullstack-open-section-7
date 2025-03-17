import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('displays blog\'s title and author, but nothing else', () => {
  const blog = {
    id: '67bde0ab2088ec2747c78458',
    title: 'This is a title',
    author: 'This is an Author',
    url: 'http://cevaurl.ro',
    likes: 12,
    user: {
      id: '67b86d736dec406bca9a3a98',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const header = container.querySelector('.header')
  const collapsed = container.querySelector('collapsed')

  expect(header).toBeDefined()
  expect(collapsed).toBeNull()
})

test('collpased info is shown when view button is clicked', async () => {
  const blog = {
    id: '67bde0ab2088ec2747c78458',
    title: 'This is a title',
    author: 'This is an Author',
    url: 'http://cevaurl.ro',
    likes: 12,
    user: {
      id: '67b86d736dec406bca9a3a98',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const currentUser = {
    token: 'sometoken',
    username: 'mluukkai',
    name: 'Matti Luukkainen'
  }

  const { container } = render(<Blog blog={blog} currentUser={currentUser} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const collpased = container.querySelector('.collapsed')
  expect(collpased).toBeDefined()
})

test('like button is clicked twice', async () => {
  const blog = {
    id: '67bde0ab2088ec2747c78458',
    title: 'This is a title',
    author: 'This is an Author',
    url: 'http://cevaurl.ro',
    likes: 12,
    user: {
      id: '67b86d736dec406bca9a3a98',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }

  const currentUser = {
    token: 'sometoken',
    username: 'mluukkai',
    name: 'Matti Luukkainen'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} currentUser={currentUser} onUpdate={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})