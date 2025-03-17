import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler with the right details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'This is a title')
  await user.type(inputs[1], 'Author Name')
  await user.type(inputs[2], 'http://someurl.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
  expect(createBlog.mock.calls[0][0].author).toBe('Author Name')
  expect(createBlog.mock.calls[0][0].url).toBe('http://someurl.com')
})
