/* eslint no-param-reassign: 0 */
const getOffsetToRoot = element => {
  let left = 0
  let top = 0

  while (element
    && !isNaN(element.offsetLeft)
    && !isNaN(element.offsetTop)
  ) {
    left += element.offsetLeft - element.scrollLeft
    top += element.offsetTop - element.scrollTop
    element = element.offsetParent
  }

  return ({ offsetTop: top, offsetLeft: left })
}

export default getOffsetToRoot
