import React from "react";
import { findDOMNode } from "react-dom";
import wrapDisplayName from "recompose/wrapDisplayName";
import setDisplayName from "recompose/setDisplayName";
import pick from "lodash/pick";
import isFunction from "lodash/isFunction";

const pickedProps = [
  "offsetWidth",
  "offsetHeight",
  "clientWidth",
  "clientHeight",
  "scrollWidth",
  "scrollHeight"
];

const withSize = throttle => BaseComponent => {
  class WithSize extends React.Component {
    state = {};

    /*
       * The erd will append an object element to the DOM.
       * Before react@15, if there is a string without a wrapping
       * element inside your component, ex: () => <div>foo</div>,
       * react will create a <span /> for you. This behavior will
       * cause the erd not working. Make sure to wrap your strings,
       * ex: () => <div><span>foo</span></div>.
       */

    componentDidMount = () => {
      /* eslint-disable global-require */
      this.erd = require("element-resize-detector")();
      /* eslint-enable global-require */

      this.erd.listenTo(findDOMNode(this), this.onResize);

      this.setSizeToState();
    };

    componentWillUnmount = () => {
      if (isFunction(this.onResize.cancel)) {
        this.onResize.cancel();
      }

      this.erd.removeListener(findDOMNode(this), this.onResize);
    };

    setSizeToState = () =>
      this.setState({ DOMSize: pick(findDOMNode(this), pickedProps) });

    onResize = throttle(this.setSizeToState);

    render = () =>
      React.createElement(BaseComponent, {
        ...this.props,
        ...this.state
      });
  }

  if (process.env.NODE_ENV !== "production") {
    return setDisplayName(wrapDisplayName(BaseComponent, "withSize"))(WithSize);
  }

  return WithSize;
};

export default withSize;
