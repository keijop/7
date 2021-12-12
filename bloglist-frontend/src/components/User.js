import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const param = useParams()
  const userList = useSelector(state => state.userList)
  const user = userList.filter(user => user.id === param.userID)[0]
  // if userList has not been fetched from the server yet return null
  // reloading page produces this situation
  if (!user) return null
  return (
    <>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </>
  )
}

export default User
