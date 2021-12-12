import React from 'react'

const Message = ({ message }) => {
  return (
    <div>
      <span
        id='message'
        style={
          message.warning
            ? { border: '3px solid red', color: 'red', padding: 5 }
            : { border: '3px solid green', color: 'green', padding: 5 }
        }
      >
        {message.text}
      </span>
    </div>
  )
}

export default Message
