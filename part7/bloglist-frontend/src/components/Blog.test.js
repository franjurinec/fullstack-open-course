import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'Test Blog Title',
    author: 'Mr. Test',
    url: 'someUrl.com',
    likes: 5,
    user: { name: 'Jest' }
  }

  test('Renders only title and author by default', () => {
    render(<Blog blog={blog} />)

    expect(screen.queryByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.author, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url, { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByText(blog.likes, { exact: false })).not.toBeInTheDocument()
  })

  test('Expanded blog shows url and likes', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(screen.queryByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.author, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.likes, { exact: false })).toBeInTheDocument()
  })

  test('Liking twice calls event handler twice', async () => {
    const likeHandler = jest.fn()

    render(<Blog blog={blog} onLike={likeHandler} />)

    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })

})

