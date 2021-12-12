import blogService from '../services/blogs'
//import { displayNotification } from './notificationReducer'

const initialState = []

// ACTION CREATORS (pure functions)

const initBlogs = blogs => {
  return { type: 'INIT_BLOGS', data: { blogs } }
}

const addBlog = newBlog => {
  return { type: 'ADD_BLOG', data: { newBlog } }
}

const updateBlog = updatedBlog => {
  return { type: 'UPDATE_BLOG', data: { updatedBlog } }
}

const removeBlog = removedBlog => {
  return { type: 'REMOVE_BLOG', data: { removedBlog } }
}

// THUNK FUNCTIONS (async dispatching/ajax logic)

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(initBlogs(blogs))
  }
}

export const createBlog = (body, token) => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(body, token)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = likedBlog => {
  return async dispatch => {
    const response = await blogService.updateBlog(likedBlog.id, {
      likes: likedBlog.likes + 1,
    })
    const updatedBlog = response.data
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (id, user) => {
  return async dispatch => {
    const response = await blogService.removeBlog(id, user.token)
    const removedBlog = response.data
    dispatch(removeBlog(removedBlog))
  }
}

// BLOG REDUCER

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'ADD_BLOG':
      return [...state, action.data.newBlog.data]
    case 'UPDATE_BLOG':
      const id = action.data.updatedBlog.id
      const updatedBlog = action.data.updatedBlog
      const newState = state.map(blog => (blog.id !== id ? blog : updatedBlog))
      return newState
    case 'REMOVE_BLOG':
      const removedBlog = action.data.removedBlog
      const filteredState = state.filter(blog => blog.id !== removedBlog.id)
      return filteredState
    default:
      return state
  }
}

export default blogReducer
