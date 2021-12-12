import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UsersList() {
  const userList = useSelector(state => state.userList)

  return (
    <table>
      <tbody>
        <tr>
          <th>users</th>
          <th>blogs</th>
        </tr>
        {userList.map(user => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UsersList
