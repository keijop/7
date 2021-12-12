import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UsersList from './components/UsersList'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/users' element={<UsersList />} />
          <Route path='users/:userID' element={<User />} />
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/blogs/:blogID' element={<Blog />} />
          <Route index element={<BlogList />} />
        </Route>
      </Routes>
    </Router>
  </Provider>,
  document.getElementById('root')
)
