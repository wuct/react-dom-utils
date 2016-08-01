import React from 'react'
import createElement from 'recompose/createEagerElement'
import createHelper from 'recompose/createHelper'
import isFunction from 'lodash/isFunction'

const mapPropsOnEvent = (getTarget, type, propsMapper, throttle, mapOnMount) => BaseComponent =>
    class extends React.Component {
      state = {}

      componentDidMount = () => {
        this.target = getTarget(this)
        this.target.addEventListener(type, this.mapProps)

        if (mapOnMount) {
          this.mapProps()
        }
      }

      componentWillUnmount = () => {
        if (isFunction(this.mapProps.cancel)) {
          this.mapProps.cancel()
        }

        if (this.target) {
          this.target.removeEventListener(type, this.mapProps)
        }
      }

      mapProps = throttle(
        e => this.setState(propsMapper(e, this))
      )

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          ...this.state,
        })
    }

export default createHelper(mapPropsOnEvent, 'mapPropsOnEvent')
