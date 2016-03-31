import { findDOMNode } from 'react-dom'
import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import identity from 'lodash/identity'
import mapPropsOnEvent from './mapPropsOnEvent'

const pickedProps = [
  'pageX',
  'pageY',
  'clientX',
  'clientY',
  'screenX',
  'screenY',
]

const withMousePosition = (throttle = identity) =>
  mapPropsOnEvent(
    self => findDOMNode(self),
    'mousemove',
    e => ({ mousePosition: pick(e, pickedProps) }),
    throttle,
    false
  )

export default createHelper(withMousePosition, 'withMousePosition')
