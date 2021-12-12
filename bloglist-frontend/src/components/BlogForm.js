import React, { useState } from 'react'

import Button from './styledComponents/Button'

const BlogForm = ({ submitHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogSubmitHandler = event => {
    event.preventDefault()
    submitHandler(title, author, url)
  }

  return (
    <form onSubmit={blogSubmitHandler}>
      <input
        id='title'
        type='text'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <label htmlFor='title'>title</label>
      <br />
      <input
        id='author'
        type='text'
        value={author}
        onChange={event => setAuthor(event.target.value)}
      />
      <label htmlFor='author'>author</label>
      <br />
      <input
        id='url'
        type='url'
        value={url}
        onChange={event => setUrl(event.target.value)}
      />
      <label htmlFor='url'>url</label>
      <br />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default BlogForm
