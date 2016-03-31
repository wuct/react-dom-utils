import { findDOMNode } from 'react-dom'
import createHelper from 'recompose/createHelper'
import identity from 'lodash/identity'
import mapPropsOnEvent from './mapPropsOnEvent'
import getOffsetToRoot from './getOffsetToRoot'

const withOffsetToRoot = (throttle = identity) =>
  mapPropsOnEvent(
    () => window,
    'resize',
    (e, self) => ({ offsetToRoot: getOffsetToRoot(findDOMNode(self)) }),
    throttle,
    true
  )

export default createHelper(withOffsetToRoot, 'withOffsetToRoot')
