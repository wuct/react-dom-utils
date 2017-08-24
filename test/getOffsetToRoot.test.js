import React from "react";
import { findDOMNode } from "react-dom";
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

test("one level DOM tree", () => {
  const Foo = () => <div style={{ marginTop: 10, marginLeft: 10 }} />;
  const wrapper = mount(<Foo />);
  const dom = findDOMNode(wrapper.instance());

  expect(getOffsetToRoot(dom)).toEqual({ offsetTop: 10, offsetLeft: 10 });
});

test("two levels DOM tree", () => {
  const Foo = () =>
    <div style={{ marginTop: 1, marginLeft: 2 }}>
      <div style={{ marginTop: 3, marginLeft: 4 }} className="bar" />
    </div>;

  const wrapper = mount(<Foo />);
  const dom = findDOMNode(wrapper.find("div").get(1));

  expect(getOffsetToRoot(dom)).toEqual({ offsetTop: 4, offsetLeft: 6 });
});
