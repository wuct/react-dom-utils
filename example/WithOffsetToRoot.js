import React from 'react'
import throttle from 'raf-throttle'
import withOffsetToRoot from '../src/withOffsetToRoot'

const style = {
  width: 200,
  height: 200,
  backgroundColor: '#93626A',
}

const component = ({ offsetToRoot }) => (
  <div style={style}>
    {JSON.stringify(offsetToRoot)}
  </div>
)

export default withOffsetToRoot(throttle)(component)
