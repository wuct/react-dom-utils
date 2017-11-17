import React from "react";
import test from "ava";
import { mount } from "enzyme";
import expect from "expect";

import getOffsetToRoot from "../src/getOffsetToRoot";

// jsdom still has not supported offsetTop adn offsetLeft, yet,
// so we use this hack currenty.
// see: https://github.com/tmpvar/jsdom/issues/135

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginLeft) || 0;
    }
  },
  offsetTop: {
    get() {
      return parseFloat(window.getComputedStyle(this).marginTop) || 0;
    }
  },
  scrollLeft: {
    get() {
      return 0;
    }
  },
  scrollTop: {
    get() {
      return 0;
    }
  },
  offsetParent: {
    get() {
      return this.parentNode;
    }
  }
});

class Div extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

test("one level DOM tree", () => {
  const wrapper = mount(<Div style={{ marginTop: 10, marginLeft: 10 }} />);
  const dom = wrapper.getDOMNode();

  expect(getOffsetToRoot(dom)).toEqual({ offsetTop: 10, offsetLeft: 10 });
});

test("two levels DOM tree", () => {
  const wrapper = mount(
    <Div style={{ marginTop: 1, marginLeft: 2 }}>
      <Div style={{ marginTop: 3, marginLeft: 4 }} />
    </Div>
  );

  const dom = wrapper.find(Div).last().getDOMNode();

  expect(getOffsetToRoot(dom)).toEqual({ offsetTop: 4, offsetLeft: 6 });
});
