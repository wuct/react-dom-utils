import React from 'react'
import { findDOMNode } from 'react-dom'
import createHelper from 'recompose/createHelper'
import createElement from 'recompose/createEagerElement'
import pick from 'lodash/pick'
import isFunction from 'lodash/isFunction'

const pickedProps = [
  'pageX',
  'pageY',
  'clientX',
  'clientY',
  'screenX',
  'screenY',
]

export const defaultState = { mousePosition: undefined }

const withMousePosition = throttle => BaseComponent =>
  class extends React.Component {
    state = defaultState

    componentDidMount = () => {
      this.dom = findDOMNode(this)
      this.dom.addEventListener('mousemove', this.onMouseMove)
      this.dom.addEventListener('mouseleave', this.onMouseLeave)
    }

    componentWillUnmount = () => {
      if (isFunction(this.onMouseMove.cancel)) {
        this.onMouseMove.cancel()
      }

      this.dom.removeEventListener('mousemove', this.onMouseMove)
      this.dom.removeEventListener('mouseleave', this.onMouseLeave)
    }

    onMouseMove = throttle(
      e => this.setState({ mousePosition: pick(e, pickedProps) })
    )

    onMouseLeave = () =>
      this.setState(defaultState)

    render = () =>
      createElement(BaseComponent, {
        ...this.props,
        ...this.state,
      })
  }

export default createHelper(withMousePosition, 'withMousePosition')
