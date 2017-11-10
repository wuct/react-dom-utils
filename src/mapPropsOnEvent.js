import React from "react";
import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import isFunction from "lodash/isFunction";

const mapPropsOnEvent = (
  getTarget,
  type,
  propsMapper,
  throttle,
  mapOnMount
) => BaseComponent => {
  class MapPropsOnEvent extends React.Component {
    state = {};

    componentDidMount = () => {
      this.target = getTarget(this);
      this.target.addEventListener(type, this.mapProps);

      if (mapOnMount) {
        this.mapProps();
      }
    };

    componentWillUnmount = () => {
      if (isFunction(this.mapProps.cancel)) {
        this.mapProps.cancel();
      }

      if (this.target) {
        this.target.removeEventListener(type, this.mapProps);
      }
    };

    mapProps = throttle(e => this.setState(propsMapper(e, this)));

    render = () =>
      React.createElement(BaseComponent, {
        ...this.props,
        ...this.state
      });
  }

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "mapPropsOnEvent"))(
      MapPropsOnEvent
    );
  }

  return MapPropsOnEvent;
};

export default mapPropsOnEvent;
