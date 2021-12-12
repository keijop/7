import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {
  let component

  const blog = {
    author: 'Some author',
    title: 'A Big Title',
    like: 0,
    url: 'www.stuff.com',
    user: {
      username: 'testuser',
    },
  }
  const user = { username: 'testuser' }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} likeHandler={mockHandler} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      '"A Big Title" by Some author'
    )
    expect(component.container).not.toHaveTextContent('www.stuff.com')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('displays details after show details button click', () => {
    const button = component.container.querySelector('.detailsTogglerBtn')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('likes')
    expect(component.container).toHaveTextContent('www.stuff.com')
  })

  test('clicking like button two times calls event handler two times', () => {
    const detailsBtn = component.container.querySelector('.detailsTogglerBtn')
    fireEvent.click(detailsBtn)
    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
