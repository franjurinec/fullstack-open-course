import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@chakra-ui/react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible((v) => !v)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <Box>
      <Box display={visible ? 'none' : ''}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <Box display={visible ? '' : 'none'}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Toggleable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any
}

export default Togglable
