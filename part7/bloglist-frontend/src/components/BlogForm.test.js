import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Passes correct data to handler function', async () => {
    const testData = {
      title: 'Test Title',
      author: 'Some User',
      url: 'https://blog.test.com'
    }

    const submitHandler = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm onSubmit={submitHandler} />)

    const titleInput = screen.getByPlaceholderText('Enter Title')
    const authorInput = screen.getByPlaceholderText('John Doe')
    const urlInput = screen.getByPlaceholderText('http://example.url.com')
    const submitButton = screen.getByRole('button')

    await user.type(titleInput, testData.title)
    await user.type(authorInput, testData.author)
    await user.type(urlInput, testData.url)
    await user.click(submitButton)

    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0]).toBe(testData.title)
    expect(submitHandler.mock.calls[0][1]).toBe(testData.author)
    expect(submitHandler.mock.calls[0][2]).toBe(testData.url)
  })

})