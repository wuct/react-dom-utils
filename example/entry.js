import React from 'react'
import { render } from 'react-dom'
import WithMousePosition from './WithMousePosition'
import WithSize from './WithSize'
import WithWindowSize from './WithWindowSize'
import WithOffsetToRoot from './WithOffsetToRoot'

render(
  <div>
    <WithMousePosition />
    <WithSize />
    <WithWindowSize />
    <WithOffsetToRoot />
  </div>,
  document.querySelector('#mountNode'),
)
