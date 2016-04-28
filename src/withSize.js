import React from 'react'
import { findDOMNode } from 'react-dom'
import erdFactory from 'element-resize-detector'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'

const erd = erdFactory()
const pickedProps = [
  'offsetWidth',
  'offsetHeight',
  'clientWidth',
  'clientHeight',
  'scrollWidth',
  'scrollHeight',
]

const withSize = (throttle = identity) =>
  BaseComponent =>
    class extends React.Component {
      state = {}

      /*
       * The erd will append an object element to the DOM.
       * Before react@15, if there is a string without a wrapping
       * element inside your component, ex: () => <div>foo</div>,
       * react will create a <span /> for you. This behavior will
       * cause the erd not working. Make sure to wrap your strings,
       * ex: () => <div><span>foo</span></div>.
       */

      componentDidMount = () => {
        erd.listenTo(findDOMNode(this), this.onResize)

        this.setSizeToState()
      }

      componentWillUnmount = () => {
        if (isFunction(this.onResize.cancel)) {
          this.onResize.cancel()
        }

        erd.removeListener(findDOMNode(this), this.onResize)
      }

      setSizeToState = () =>
        this.setState({ DOMSize: pick(findDOMNode(this), pickedProps) })

      onResize = throttle(this.setSizeToState)

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          ...this.state,
        })
    }

export default createHelper(withSize, 'withSize')
