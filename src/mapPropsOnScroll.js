import React from "react";
import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import isFunction from "lodash/isFunction";

const getScroll = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});

const mapPropsOnScroll = (propsMapper, throttle) => BaseComponent => {
  class MapPropsOnScroll extends React.Component {
    scroll = {};

    componentDidMount = () => {
      this.scroll = getScroll();
      window.addEventListener("scroll", this.mapProps);
    };

    componentWillUnmount = () => {
      if (isFunction(this.mapProps.cancel)) {
        this.mapProps.cancel();
      }

      window.removeEventListener("scroll", this.mapProps);
    };

    mapProps = throttle(() => {
      // Remind: fix for safari over scrolling problem
      const maxY = document.body.offsetHeight - window.innerHeight;
      if (
        document.body.offsetHeight !== 0 && // offsetHeight is always zero in jsdom
        (getScroll().y < 0 || getScroll().y > maxY)
      ) {
        return;
      }

      this.setState(() => propsMapper(getScroll(), this.scroll));
      this.scroll = getScroll();
    });

    render = () =>
      React.createElement(BaseComponent, {
        ...this.props,
        ...this.state
      });
  }

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "mapPropsOnScroll"))(
      MapPropsOnScroll
    );
  }

  return MapPropsOnScroll;
};

export default mapPropsOnScroll;
