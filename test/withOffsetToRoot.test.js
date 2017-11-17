import React from "react";
import test from "ava";
import { mount } from "enzyme";
import expect from "expect";
import simulant from "simulant";

import withOffsetToRoot from "../src/withOffsetToRoot";

class Div extends React.Component {
  render() {
    return <div />;
  }
}

test("append offsetToRoot after mounting", () => {
  const Container = withOffsetToRoot(f => f)(Div);
  const wrapper = mount(<Container />);

  expect(wrapper.find(Div).props()).toInclude({
    offsetToRoot: { offsetTop: 0, offsetLeft: 0 }
  });
});

test("update offsetToRoot when the window is resized", () => {
  const cwrpSpy = expect.createSpy();

  class Foo extends React.Component {
    componentWillReceiveProps = cwrpSpy;
    render = () => null;
  }

  const Container = withOffsetToRoot(f => f)(Foo);

  mount(<Container />);

  // invoke in cdm
  expect(cwrpSpy.calls.length).toEqual(1);

  // invoke when resizing
  simulant.fire(window, "resize");
  simulant.fire(window, "resize");

  expect(cwrpSpy.calls.length).toEqual(3);
});
