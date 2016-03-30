import React from 'react'
import { render } from 'react-dom'
import WithMousePosition from './WithMousePosition'
import WithDOMSize from './WithDOMSize'

render(
  <div>
    <WithMousePosition />
    <WithDOMSize />
  </div>,
  document.querySelector('#mountNode')
)
