import React, { useState, useEffect, useRef } from 'react'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import {
  userLogin,
  logoutUser,
  setUserFromLocalStorage,
} from './reducers/userReducer'
import { initializeUserList } from './reducers/userListReducer'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'

import { ThemeProvider } from 'styled-components'
import { theme } from './components/styledComponents/theme'
import Wrapper from './components/styledComponents/Wrapper'

const App = () => {
  const user = useSelector(state => state.user)
  const message = useSelector(state => state.messages)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUserList())
  }, [dispatch])

  // persisit logged in user in browser
  useEffect(() => {
    dispatch(setUserFromLocalStorage())
  }, [dispatch])

  const displayMessage = (text, warning, time) => {
    dispatch(displayNotification(text, warning, time))
  }

  const loginHandler = event => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(userLogin(username, password))
  }

  const logoutHandler = event => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logoutUser())
    navigate('/')
    displayMessage('LOGGED OUT', true, 5000)
  }

  const blogSubmitHandler = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog({ title, author, url }, user.token))
      displayMessage(`${title} by ${author} added`, false, 5000)
    } catch (error) {
      displayMessage(error.response.data.error, true)
    }
  }

  // const removeHandler = async (id, user) => {
  //   try {
  //     if (!window.confirm('Really delete this?')) return
  //     dispatch(deleteBlog(id, user))
  //     displayMessage('DELETED', false, 5000)
  //   } catch (error) {
  //     displayMessage(error.response.data.error, true, 5000)
  //   }
  // }

  if (user === '') {
    return (
      <Wrapper>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          clickHandler={loginHandler}
        />
        <br />
        {message.text && <Message message={message} />}
      </Wrapper>
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Navbar logoutHandler={logoutHandler} />
        <h2>Blogs</h2>

        {message.text && <Message message={message} />}

        <Togglable buttonLabel={'create blog'} ref={blogFormRef}>
          <BlogForm
            postBlog={blogService.postBlog}
            displayMessage={displayMessage}
            submitHandler={blogSubmitHandler}
          />
        </Togglable>

        <Outlet context={['1', '2']} />
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
