# react-dom-utils

> DOM operation utilities for React

[![npm](https://img.shields.io/npm/v/react-dom-utils.svg)](https://www.npmjs.com/package/react-dom-utils)
[![Travis](https://img.shields.io/travis/wuct/react-dom-utils.svg)](https://travis-ci.org/wuct/react-dom-utils)
[![Coveralls](https://img.shields.io/coveralls/wuct/react-dom-utils.svg)](https://coveralls.io/github/wuct/react-dom-utils)
[![Code Climate](https://img.shields.io/codeclimate/github/wuct/react-dom-utils.svg)](https://codeclimate.com/github/wuct/react-dom-utils)

[react-dom-utils](https://www.npmjs.com/package/react-dom-utils) let you work with DOMs in HOCs.

## Installation

`npm install react-dom-utils --save`

## API

### mapPropsOnEvent(getTarget, type, propsMapper, throttle, [mapOnMount])

### withMousePosition([throttleFunc])
#### props
  - mousePosition

### withSize([throttleFunc])
#### props
  - DOMSize
 
### withWindowSize([throttleFunc])
#### props
  - windowSize

### withOffsetToRoot([throttleFunc])
#### props
  - offsetToRoot
 
#### throttleFunc
The function is used for throttling events. It is recommended to use [raf-throttle](https://github.com/wuct/raf-throttle).
Default to [lodash/identity](https://lodash.com/docs#identity).

## Example

```js
import React from 'react'
import throttle from 'raf-throttle'
import withMousePosition from 'react-dom-utils/lib/withMousePosition.js'

export default withMousePosition(throttle)(
  ({ mousePosition }) => <div>{JSON.stringify(mousePosition)}</div>
)
```

More examples is [here](https://github.com/wuct/react-dom-utils/tree/master/example)

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
