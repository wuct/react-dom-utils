import React from 'react'
import { findDOMNode } from 'react-dom'
import test from 'ava'
import { mount } from 'enzyme'
import expect from 'expect'
import simulant from 'simulant'

import mapPropsOnEvent from '../src/mapPropsOnEvent'

test("map props on window's events", () => {
  const mapSpy = expect.createSpy().andReturn({ foo: 'bar' })

  const Container = mapPropsOnEvent(
    () => window,
    'resize',
    mapSpy,
    f => f
  )('div')

  const wrapper = mount(<Container />)

  simulant.fire(window, 'resize')
  expect(mapSpy.calls.length).toEqual(1)

  expect(wrapper.find('div').props())
  .toEqual({ foo: 'bar' })

  simulant.fire(window, 'resize')
  expect(mapSpy.calls.length).toEqual(2)

  wrapper.unmount()

  simulant.fire(window, 'resize')
  expect(mapSpy.calls.length).toEqual(2)
})

test("map props on dom's events", () => {
  const mapSpy = expect.createSpy().andReturn({ foo: 'bar' })

  const Container = mapPropsOnEvent(
    self => findDOMNode(self),
    'click',
    mapSpy,
    f => f
  )('div')

  const wrapper = mount(<Container />)
  const dom = findDOMNode(wrapper.instance())

  simulant.fire(dom, 'click')
  expect(mapSpy.calls.length).toEqual(1)

  expect(wrapper.find('div').props())
  .toEqual({ foo: 'bar' })

  simulant.fire(dom, 'click')
  expect(mapSpy.calls.length).toEqual(2)

  wrapper.unmount()

  simulant.fire(dom, 'click')
  expect(mapSpy.calls.length).toEqual(2)
})

