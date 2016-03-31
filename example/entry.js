import React from 'react'
import { render } from 'react-dom'
import WithMousePosition from './WithMousePosition'
import WithSize from './WithSize'
import WithWindowSize from './WithWindowSize'

render(
  <div>
    <WithMousePosition />
    <WithSize />
    <WithWindowSize />
  </div>,
  document.querySelector('#mountNode')
)
