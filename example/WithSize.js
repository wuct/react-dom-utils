import React from 'react'
import throttle from 'raf-throttle'
import withSize from '../src/withSize'

const style = {
  width: '100%',
  height: 100,
  backgroundColor: '#7E94C7',
}

const component = ({ DOMSize }) =>
  <div style={style}>
    <span>
      {JSON.stringify(DOMSize)}
    </span>
  </div>

export default withSize(throttle)(component)
