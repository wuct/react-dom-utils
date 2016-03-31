import React from 'react'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'

const mapPropsOnEvent =
  (getTarget, type, propsMapper, throttle, mapOnMount = false) =>
  BaseComponent =>
    class extends React.Component {
      state = {}

      componentDidMount = () => {
        this.target = getTarget(this)
        this.target.addEventListener(type, this.mapProps)

        if (mapOnMount) {
          this.mapProps()
        }
      }

      componentWillUnmount = () =>
        this.target.removeEventListener(type, this.mapProps)

      mapProps = throttle(
        () => this.setState(propsMapper(this.props))
      )

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          ...this.state,
        })
    }

export default createHelper(mapPropsOnEvent, 'mapPropsOnEvent')
