import React from 'react'
import createElement from 'recompose/createElement'
import createHelper from 'recompose/createHelper'
import isFunction from 'lodash/isFunction'
import lodashThrottle from 'lodash/throttle';

const getScroll = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
})

const mapPropsOnScroll =
  (propsMapper, throttle = lodashThrottle) =>
  BaseComponent =>
    class extends React.Component {
      scroll = {};

      componentDidMount = () => {
        this.scroll = getScroll()
        window.addEventListener('scroll', this.mapProps)
      }

      componentWillUnmount = () => {
        if (isFunction(this.mapProps.cancel)) {
          this.mapProps.cancel()
        }

        window.removeEventListener('scroll', this.mapProps)
      }

      mapProps = throttle(
        () => {
          // Remind: fix for safari over scrolling problem
          const maxY = document.body.offsetHeight - window.innerHeight
          if (getScroll().y < 0 || getScroll().y > maxY) return;

          this.setState(propsMapper(getScroll(), this.scroll))
          this.scroll = getScroll()
        }
      )

      render = () =>
        createElement(BaseComponent, {
          ...this.props,
          ...this.state,
        })
    }

export default createHelper(mapPropsOnScroll, 'mapPropsOnScroll')
