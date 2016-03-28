import React from 'react'
import { render } from 'react-dom'
import WithMousePosition from './WithMousePosition'

render(
  <div>
    <WithMousePosition />
  </div>,
  document.querySelector('#mountNode')
)
