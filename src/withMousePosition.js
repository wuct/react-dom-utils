import React from 'react'
import { findDOMNode } from 'react-dom'
import createHelper from 'recompose/createHelper'
import createElement from 'recompose/createElement'
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

    componentDidMount = () => {
      this.dom = findDOMNode(this)
      this.dom.addEventListener('mousemove', this.onMouseMove)
      this.dom.addEventListener('mouseleave', this.onMouseLeave)
    }

    componentWillUnmount = () => {
      this.dom.removeEventListener('mousemove', this.onMouseMove)
      this.dom.removeEventListener('mouseleave', this.onMouseLeave)
    }

    onMouseMove = e =>
      throttle(this.setState({ mousePosition: pick(e, pickedProps) }))

    onMouseLeave = () =>
      this.setState({ mousePosition: {}})

    render = () =>
      createElement(BaseComponent, {
        ...this.props,
        ...this.state,
      })
  }

export default createHelper(withMousePosition, 'withMousePosition')
