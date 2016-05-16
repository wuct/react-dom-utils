import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import expect from 'expect'

import withSize from '../src/withSize'

test('append DOMSize after mounting', () => {
  const Container = withSize(f => f)('div')
  const wrapper = mount(<Container />)

  expect(wrapper.find('div').props()).toIncludeKey('DOMSize')
})


test('invoke the cancel function of the provided throttle when unmount', () => {
  const cancelSpy = expect.createSpy()

  /* eslint no-param-reassign:["error", { "props": false }] */
  const fakeThrottle = func => {
    func.cancel = cancelSpy
    return func
  }

  const Container = withSize(fakeThrottle)('div')
  const wrapper = mount(<Container />)

  wrapper.unmount()

  expect(cancelSpy).toHaveBeenCalled()
})
