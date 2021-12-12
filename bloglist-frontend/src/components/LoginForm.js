import React from 'react'
import PropTypes from 'prop-types'

export const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  clickHandler,
}) => {
  LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired,
  }

  return (
    <form>
      <label htmlFor='username'>username:</label>
      <input
        id='username'
        type='text'
        name='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      ></input>
      <br />
      <label htmlFor='password'>password:</label>
      <input
        id='password'
        type='password'
        name='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      ></input>
      <br />
      <button onClick={clickHandler}>log in</button>
    </form>
  )
}

export default LoginForm
