import loginService from '../services/login'
import { displayNotification } from './notificationReducer'

const initialstate = ''

// ACTION CREATOR

const loginUser = user => {
  return { type: 'LOGIN_USER', data: user }
}

export const logoutUser = () => {
  return { type: 'LOGOUT_USER' }
}

const userFromLocaleStorage = user => {
  return { type: 'USER_FROM_LOCALE_STORAGE', data: user }
}

// THUNK FUNCTION
export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(loginUser(user))
      dispatch(displayNotification('login sucess', false, 5000))
    } catch (error) {
      dispatch(displayNotification(error.response.data.error, true, 5000))
      return
    }
  }
}

export const userLogout = () => {
  console.log('thunk')
  return async dispatch => {
    dispatch(logoutUser)
  }
}

export const setUserFromLocalStorage = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userFromLocaleStorage(user))
    }
  }
}

const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'LOGOUT_USER':
      return ''
    case 'USER_FROM_LOCALE_STORAGE':
      return action.data
    default:
      return state
  }
}

export default userReducer
