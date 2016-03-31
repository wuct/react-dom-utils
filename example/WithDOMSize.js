import React from 'react'
import throttle from 'raf-throttle'
import withDOMSize from '../src/withDOMSize.js'

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

export default withDOMSize(throttle)(component)
