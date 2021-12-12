import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  test('calls submitHandler with correct user input data', () => {
    const submitHandler = jest.fn()
    const component = render(<BlogForm submitHandler={submitHandler} />)
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(title, {
      target: { value: 'how to use jest-dom' },
    })
    fireEvent.change(author, {
      target: { value: 'M.Luu' },
    })
    fireEvent.change(url, {
      target: { value: 'www.dom.com' },
    })
    fireEvent.submit(form)
    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0]).toBe('how to use jest-dom')
    expect(submitHandler.mock.calls[0][1]).toBe('M.Luu')
    expect(submitHandler.mock.calls[0][2]).toBe('www.dom.com')
  })
})
