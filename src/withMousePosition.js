import React from 'react'
import { findDOMNode } from 'react-dom'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import identity from 'lodash/identity'

const pickedProps = [
  'pageX',
  'pageY',
  'clientX',
  'clientY',
  'screenX',
  'screenY',
]

const withMousePosition = (throttle = identity) =>
  BaseComponent =>
    class extends React.Component {
      state = {}

      componentDidMount = () =>
        findDOMNode(this)
        .addEventListener('mousemove', this.onMouseMove)

      componentWillUnmount = () =>
        findDOMNode(this)
        .removeEventListener('mousemove', this.onMouseMove)

      onMouseMove = throttle(
        e => this.setState(pick(e, pickedProps))
      )

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          mousePosition: this.state,
        })
    }

export default createHelper(withMousePosition, 'withMousePosition')
