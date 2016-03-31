import React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import withWindowSize from '../src/withWindowSize'

test(t => {
  const Container = withWindowSize()(() => <div />)

  shallow(<Container />)

  t.pass()
})
