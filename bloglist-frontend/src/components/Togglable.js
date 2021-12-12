import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from './styledComponents/Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const togglableStyle = visible ? { display: '' } : { display: 'none' }

  return (
    <div>
      <div style={togglableStyle}>{props.children}</div>
      <Button onClick={toggleVisibility}>
        {visible ? 'close' : props.buttonLabel}
      </Button>
    </div>
  )
})

export default Togglable
