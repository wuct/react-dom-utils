import React from 'react'
import test from 'ava'
import { mount } from 'enzyme'

import withMousePosition from '../src/withMousePosition'

test(t => {
  const Container = withMousePosition()(() => <div />)

  mount(<Container />)

  t.pass()
})
