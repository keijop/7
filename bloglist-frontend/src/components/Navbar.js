import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from './styledComponents/Button'
import Nav from './styledComponents/Nav'

const Navbar = ({ logoutHandler }) => {
  const user = useSelector(state => state.user)

  const activeLinkStyle = {
    backgroundColor: '#f3e9e5',
  }

  return (
    <Nav>
      <NavLink
        style={({ isActive }) => (isActive ? activeLinkStyle : null)}
        to='/users'
      >
        USERS
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeLinkStyle : null)}
        to='/blogs'
      >
        BLOGS
      </NavLink>
      <span>
        <b>{user.name}</b> is logged in
      </span>
      <Button onClick={logoutHandler}>logout</Button>
    </Nav>
  )
}

export default Navbar
