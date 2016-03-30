import React from 'react'
import { render } from 'react-dom'
import WithMousePosition from './WithMousePosition'
import WithDOMSize from './WithDOMSize'
import WithWindowSize from './WithWindowSize'

render(
  <div>
    <WithMousePosition />
    <WithDOMSize />
    <WithWindowSize />
  </div>,
  document.querySelector('#mountNode')
)
