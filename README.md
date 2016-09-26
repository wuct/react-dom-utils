# react-dom-utils

[![npm](https://img.shields.io/npm/v/react-dom-utils.svg)](https://www.npmjs.com/package/react-dom-utils)
[![Travis](https://img.shields.io/travis/wuct/react-dom-utils.svg)](https://travis-ci.org/wuct/react-dom-utils)
[![Codecov](https://img.shields.io/codecov/c/github/wuct/react-dom-utils/master.svg)](https://codecov.io/github/wuct/react-dom-utils)
[![Code Climate](https://img.shields.io/codeclimate/github/wuct/react-dom-utils.svg)](https://codeclimate.com/github/wuct/react-dom-utils)

Inspired [recompose](https://github.com/acdlite/recompose/), [react-dom-utils](https://www.npmjs.com/package/react-dom-utils) let you work with DOMs in HOCs.

We love functional stateless components, but when it comes to `findDOMNode`, we are forced to use class components. `react-dom-utils` let you lift your `findDOMNode` related jobs into hight-order components and write more small, reactive functional components.

You can use `react-dom-utils` to

* Get `window`'s width and height, and get updated when `window` resizes
* Get `keyCode`s when `document` or another DOM element receives `keyDown` events
* Get `pageX` and `pageY` from a `mousemove` event

... and more. 


## Installation

`npm install react-dom-utils --save`

## Example

```js
import React from 'react'
import withMousePosition from 'react-dom-utils/lib/withMousePosition.js'
import throttle from 'raf-throttle'

// withMousePosition appends a mousePosition object to the base component props
const enhance = withMousePosition(throttle)

const component = ({ mousePosition: { pageX, pageY } }) =>
  <div style={{ top: pageX, left: pageY, position: 'absolute' }}>
    Follow your mouse
  </div>

export default enhance(component)
```

More examples is [here](https://github.com/wuct/react-dom-utils/tree/master/example)


## Usage
### `throttle`
The throttling function is for throttling DOM events. It is recommended to use [raf-throttle](https://github.com/wuct/raf-throttle) which throttles DOM events by `requestAnimationFrame`. However, you can pass in an [identity](https://lodash.com/docs#identity) function if you do not want throttling.

## API

Docs are annotated using Flow type notation, given the following types:

```js
type ReactElementType = Class<ReactComponent> | StatelessFunctionComponent | string
```

### `mapPropsOnEvent()`

```js
mapPropsOnEvent(
  getTarget: (component: ReactComponent) => DOMEventTarget
  type: string,
  propsMapper: (event: DOMEvent, component: ReactComponent) => Object,
  throttle: Function,
  mapOnMount: boolean,
  BaseComponent: ReactElementType
): ReactElementType
```

Attaches the props returned by `propsMapper` to owner props and updates it when the specified event is triggered.

### `withMousePosition()`

```js
withMousePosition(
  throttle: Function
): ReactElementType
```

Attaches `mousePosition` to owner props and updates it when a `mouseover` event of the base component is triggered.

`mousePosition` has the following signature: 

```js
{
  pageX: number,
  pageY: number,
  clientX: number,
  clientY: number,
  screenX: number,
  screenY: number
}
```

### `withSize()`


```js
withSize(
  throttle: Function
): ReactElementType
```

Attaches `DOMSize` to owner props and updates it when a `resize` event (detected by [element-resize-detector](https://github.com/wnr/element-resize-detector)) of the base component is triggered.

`DOMSize` has the following signature: 

```js
{
  offsetWidth: number,
  offsetHeight: number,
  clientWidth: number,
  clientHeight: number,
  scrollWidth: number,
  scrollHeight: number
}
```
 
### `withWindowSize()`

```js
withWindowSize(
  throttle: Function
): ReactElementType
```

Attaches `windowSize` to owner props and updates it when a `resize` event of `window` is triggered.

`windowSize` has the following signature: 

```js
{
  innerWidth: number,
  innerHeight: number,
  outerWidth: number,
  outerHeight: number
}
```

### `withOffsetToRoot()`


```js
withOffsetToRoot(
  throttle: Function
): ReactElementType
```

Attaches `offsetToRoot` to owner props and updates it when a `resize` event of `window` is triggered.

`offsetToRoot` has the following signature: 

```js
{
  offsetTop: number,
  offsetLeft: number
}
```
 
## `mapPropsOnScroll()`

```js
type Scroll = {
  x: number,
  y: number,
};

mapPropsOnScroll(
  propsMapper: (scroll: Scroll, previousScroll: Scroll) => Object,
  throttle: Function,
  BaseComponent: ReactElementType
): ReactElementType
```

Attaches the props returned by propsMapper to owner props and updates it when a `scroll` event of the `window` is triggered.

Example:

```js
mapPropsOnScroll((scroll, previousScroll) => ({
  isScrollUp: previousScroll.y > scroll.y,
})),
```

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
