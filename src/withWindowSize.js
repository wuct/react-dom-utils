import React from 'react'
import { findDOMNode } from 'react-dom'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import identity from 'lodash/identity'

const pickedProps = [
  'innerWidth',
  'innerHeight',
  'outerWidth',
  'outerHeight',
]

const withWindowSize = (throttle = identity) =>
  BaseComponent =>
    class extends React.Component {
      state = {}

      componentDidMount = () => {
        window.addEventListener('resize', this.onResize)
        this.onResize()
      }

      componentWillUnmount = () =>
        window.removeEventListener('resize', this.onResize)

      onResize = throttle(
        () => this.setState(pick(window, pickedProps))
      )

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          windowSize: this.state,
        })
    }

export default createHelper(withWindowSize, 'withWindowSize')
