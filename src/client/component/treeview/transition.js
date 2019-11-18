/* eslint-disable react/destructuring-assignment */
import React from 'react'

import { Collapse } from '@material-ui/core'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support

const TransitionComponent = (props) => {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` }
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}

export default TransitionComponent
