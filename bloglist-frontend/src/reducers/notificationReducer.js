const initialState = {}

// keep track of timeout ID's
let previousMsgTimeoutID

export const displayNotification = (text, warning, time) => {
  return async dispatch => {
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data: { text, warning },
    })
    if (previousMsgTimeoutID) {
      clearTimeout(previousMsgTimeoutID) //if timeout exists, clear it
    }
    const currentMsgTimeoutID = setTimeout(() => {
      dispatch({
        type: 'DISPLAY_NOTIFICATION',
        data: { text: '', warning },
      })
    }, time)
    previousMsgTimeoutID = currentMsgTimeoutID //assign latest timeout id to  var previousMsgID to check on next call
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return { text: action.data.text, warning: action.data.warning }
    default:
      return state
  }
}

export default notificationReducer
