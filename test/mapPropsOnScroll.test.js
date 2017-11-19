import React from "react";
import { mount } from "enzyme";
import expect from "expect";
import simulant from "simulant";

import mapPropsOnScroll from "../src/mapPropsOnScroll";
class Null extends React.Component {
  render() {
    return null;
  }
}

test("map props on window's scroll event", () => {
  const mapSpy = expect.createSpy().andReturn({ foo: "bar" });

  const Container = mapPropsOnScroll(mapSpy, f => f)(Null);

  const wrapper = mount(<Container />);

  simulant.fire(window, "scroll");
  expect(mapSpy.calls.length).toEqual(1);
  expect(wrapper.find(Null).instance().props).toEqual({ foo: "bar" });

  simulant.fire(window, "scroll");
  expect(mapSpy.calls.length).toEqual(2);

  wrapper.unmount();

  simulant.fire(window, "scroll");
  expect(mapSpy.calls.length).toEqual(2);
});
