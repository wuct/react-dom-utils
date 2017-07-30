import React from 'react'
import throttle from 'raf-throttle'
import withWindowSize from '../src/withWindowSize'

const style = {
  width: '100%',
  height: 100,
  backgroundColor: '#6D695B',
}

const component = ({ windowSize }) =>
  (<div style={style}>
    <span>
      {JSON.stringify(windowSize)}
    </span>
  </div>)

export default withWindowSize(throttle)(component)
