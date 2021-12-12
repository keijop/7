import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { displayNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import { getComments, postComment } from '../services/comments'

import Button from './styledComponents/Button'

const Blog = () => {
  const dispatch = useDispatch()
  const param = useParams()
  const blogList = useSelector(state => state.blogs)
  const blog = blogList.filter(blog => blog.id === param.blogID)[0]

  const [comments, setComments] = useState([])

  useEffect(() => {
    getComments(param.blogID).then(resp => setComments(resp))
  }, [param.blogID])

  const displayMessage = (text, warning, time) => {
    dispatch(displayNotification(text, warning, time))
  }

  const likeHandler = () => {
    try {
      dispatch(likeBlog(blog))
      displayMessage(`VOTED: ${blog.title}`, false, 5000)
    } catch (error) {
      displayMessage(error, true, 5000)
    }
  }

  const addBlogHandler = async event => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    const newComment = await postComment(param.blogID, content)
    setComments([...comments, newComment])
    displayMessage(`COMMENT ADDED: ${newComment.content}`, false, 5000)
  }

  if (!blog) return null
  return (
    <div>
      <h1>
        "{blog.title}" by {blog.author}
      </h1>
      <span>likes : {blog.likes}</span>
      <Button className='likeBtn' onClick={() => likeHandler(blog.id)}>
        <span role='img' aria-label='like emoji on like button'>
          like &#128077;
        </span>
      </Button>
      <br />
      <a href={blog.url}>{blog.url}</a>
      <p>
        added by <b>{blog.user.name}</b>
      </p>
      <div>
        <b>comments</b>
        <form onSubmit={addBlogHandler}>
          <input name='comment' type='text' />
          <Button type='submit'>add comment</Button>
        </form>
        <ul>
          {comments.map(comment => {
            return <li key={comment.id}>{comment.content}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
