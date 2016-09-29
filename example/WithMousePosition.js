import React from 'react'
import throttle from 'raf-throttle'
import withMousePosition from '../src/withMousePosition'

const style = {
  width: 400,
  height: 400,
  backgroundColor: '#ECBDBB',
}

const component = ({ mousePosition }) => (
  <div style={style}>
    {JSON.stringify(mousePosition)}
  </div>
)

export default withMousePosition(throttle)(component)
