import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'
import expect from 'expect'

import withSize from '../src/withSize'

test('append withSize after mounting', () => {
  const Container = withSize()('div')
  const wrapper = mount(<Container />)

  expect(wrapper.find('div').props()).toIncludeKey('DOMSize')
})


test('update offsetToRoot when the window is resized', () => {
  const cwrpSpy = expect.createSpy()

  class FatCat extends React.Component {
    componentWillReceiveProps = cwrpSpy
    render = () => <div style={{ width: this.props.width }} />
  }

  const Container = withSize()(FatCat)

  const wrapper = mount(<Container />)

  // invoke in cdm
  expect(cwrpSpy.calls.length).toEqual(1)

  wrapper.setProps({ width: 100 })
  wrapper.setProps({ width: 200 })

  expect(cwrpSpy.calls.length).toEqual(3)

  wrapper.unmount()

  wrapper.setProps({ width: 300 })

  expect(cwrpSpy.calls.length).toEqual(3)
})
