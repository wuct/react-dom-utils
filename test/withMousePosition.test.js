import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import simulant from "simulant";
import identity from "lodash/identity";

import withMousePosition, { defaultState } from "../src/withMousePosition";

class Div extends React.Component {
  render() {
    return <div />;
  }
}

test("append mousePosition when mousemove", () => {
  const Container = withMousePosition(f => f)(Div);
  const wrapper = mount(<Container />);
  const dom = wrapper.getDOMNode();

  simulant.fire(dom, "mousemove", { screenX: 1 });

  expect(wrapper.find(Div).instance().props).toInclude({
    mousePosition: { screenX: 1 }
  });
});

test("reset mousePosition to default when mouseleave", () => {
  const Container = withMousePosition(f => f)(Div);
  const wrapper = mount(<Container />);
  const dom = wrapper.getDOMNode();

  simulant.fire(dom, "mousemove");
  simulant.fire(dom, "mouseleave");

  expect(wrapper.find(Div).instance().props).toEqual(defaultState);
});

test("invoke the provided throttle function only once", () => {
  const throttleSpy = expect.createSpy().andCall(identity);
  const Container = withMousePosition(throttleSpy)(Div);
  const wrapper = mount(<Container />);
  const dom = wrapper.getDOMNode();

  simulant.fire(dom, "mousemove");
  simulant.fire(dom, "mouseleave");
  wrapper.unmount();

  expect(throttleSpy.calls.length).toEqual(1);
});

test("invoke the cancel function of the provided throttle when unmount", () => {
  const cancelSpy = expect.createSpy();

  /* eslint no-param-reassign:["error", { "props": false }] */
  const fakeThrottle = func => {
    func.cancel = cancelSpy;
    return func;
  };

  const Container = withMousePosition(fakeThrottle)(Div);
  const wrapper = mount(<Container />);

  wrapper.unmount();

  expect(cancelSpy).toHaveBeenCalled();
});
