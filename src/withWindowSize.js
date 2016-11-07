import createHelper from 'recompose/createHelper'
import pick from 'lodash/pick'
import mapPropsOnEvent from './mapPropsOnEvent'

export const pickedProps = [
  'innerWidth',
  'innerHeight',
  'outerWidth',
  'outerHeight',
]

const withWindowSize = throttle =>
  mapPropsOnEvent(
    () => window,
    'resize',
    () => ({ windowSize: pick(window, pickedProps) }),
    throttle,
    true,
  )

export default createHelper(withWindowSize, 'withWindowSize')
