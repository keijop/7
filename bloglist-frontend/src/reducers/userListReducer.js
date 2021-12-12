import getAllUsers from '../services/userList'

const initialState = []

// PURE ACTION CREATOR
const initUsers = userList => {
  return { type: 'INIT_USERS', data: { userList } }
}

// ASYNC THUNK FUNCTION
export const initializeUserList = () => {
  return async dispatch => {
    const response = await getAllUsers()
    console.log(`response.data`, response.data)
    dispatch(initUsers(response.data.users))
  }
}

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.userList
    default:
      return state
  }
}

export default userListReducer
