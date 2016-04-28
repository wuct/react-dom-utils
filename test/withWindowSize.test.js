import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import expect from 'expect'
import simulant from 'simulant'

import withWindowSize, { pickedProps } from '../src/withWindowSize'

test('append withWindowSize after mounting', () => {
  const Container = withWindowSize()('div')
  const wrapper = mount(<Container />)

  expect(wrapper.find('div').props().windowSize)
  .toIncludeKeys(pickedProps)
})


test('update offsetToRoot when the window is resized', () => {
  const cwrpSpy = expect.createSpy()

  class Foo extends React.Component {
    componentWillReceiveProps = cwrpSpy
    render = () => null
  }

  const Container = withWindowSize()(Foo)

  const wrapper = mount(<Container />)

  // invoke in cdm
  expect(cwrpSpy.calls.length).toEqual(1)

  simulant.fire(window, 'resize')
  simulant.fire(window, 'resize')

  expect(cwrpSpy.calls.length).toEqual(3)

  wrapper.unmount()

  simulant.fire(window, 'resize')
  expect(cwrpSpy.calls.length).toEqual(3)
})
