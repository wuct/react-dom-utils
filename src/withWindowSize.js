import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import identity from 'lodash/identity'
import mapPropsOnEvent from './mapPropsOnEvent'

const pickedProps = [
  'innerWidth',
  'innerHeight',
  'outerWidth',
  'outerHeight',
]

const withWindowSize = (throttle = identity) =>
  mapPropsOnEvent(
    () => window,
    'resize',
    () => ({ windowSize: pick(window, pickedProps) }),
    throttle,
    true
  )

export default createHelper(withWindowSize, 'withWindowSize')
