import React from 'react'
import { findDOMNode } from 'react-dom'
import test from 'ava'
import { spy } from 'sinon'
import { mount } from 'enzyme'
import expect from 'expect'
import simulant from 'simulant'
import identity from 'lodash/identity'

import withMousePosition, { defaultState } from '../src/withMousePosition'

test('append mousePosition when mousemove', () => {
  const Container = withMousePosition()('div')
  const wrapper = mount(<Container />)
  const dom = findDOMNode(wrapper.instance())

  simulant.fire(dom, 'mousemove', { screenX: 1 })

  expect(wrapper.find('div').props())
  .toInclude({ mousePosition: { screenX: 1 }})
})

test('reset mousePosition to default when mouseleave', () => {
  const Container = withMousePosition()('div')
  const wrapper = mount(<Container />)
  const dom = findDOMNode(wrapper.instance())

  simulant.fire(dom, 'mousemove')
  simulant.fire(dom, 'mouseleave')

  expect(wrapper.find('div').props())
  .toEqual(defaultState)
})


test('invoke the provided throttle function only once', () => {
  const throttleSpy = spy(identity)
  const Container = withMousePosition(throttleSpy)('div')
  const wrapper = mount(<Container />)
  const dom = findDOMNode(wrapper.instance())

  simulant.fire(dom, 'mousemove')
  simulant.fire(dom, 'mouseleave')
  wrapper.unmount()

  expect(throttleSpy.callCount)
  .toEqual(1)
})


test('invoke the cancel function when unmount', () => {
  const cancelSpy = spy()

  /* eslint no-param-reassign:["error", { "props": false }] */
  const fakeThrottle = func => {
    func.cancel = cancelSpy
    return func
  }

  const Container = withMousePosition(fakeThrottle)('div')
  const wrapper = mount(<Container />)

  wrapper.unmount()

  expect(cancelSpy.callCount)
  .toEqual(1)
})
