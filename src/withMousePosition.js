import React from "react";
import { findDOMNode } from "react-dom";
import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import pick from "lodash/pick";
import isFunction from "lodash/isFunction";

const pickedProps = [
  "pageX",
  "pageY",
  "clientX",
  "clientY",
  "screenX",
  "screenY"
];

export const defaultState = { mousePosition: undefined };

const withMousePosition = throttle => BaseComponent => {
  class WithMousePosition extends React.Component {
    state = defaultState;

    componentDidMount = () => {
      this.dom = findDOMNode(this);
      this.dom.addEventListener("mousemove", this.onMouseMove);
      this.dom.addEventListener("mouseleave", this.onMouseLeave);
    };

    componentWillUnmount = () => {
      if (isFunction(this.onMouseMove.cancel)) {
        this.onMouseMove.cancel();
      }

      this.dom.removeEventListener("mousemove", this.onMouseMove);
      this.dom.removeEventListener("mouseleave", this.onMouseLeave);
    };

    onMouseMove = throttle(e =>
      this.setState({ mousePosition: pick(e, pickedProps) })
    );

    onMouseLeave = () => this.setState(defaultState);

    render = () =>
      React.createElement(BaseComponent, {
        ...this.props,
        ...this.state
      });
  }

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "withMousePosition"))(
      WithMousePosition
    );
  }

  return WithMousePosition;
};

export default withMousePosition;
