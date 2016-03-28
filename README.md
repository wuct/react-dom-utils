# react-dom-utils

> DOM operation utilities for React

[![npm](https://img.shields.io/npm/v/react-dom-utils.svg)](https://www.npmjs.com/package/react-dom-utils)
[![Travis](https://img.shields.io/travis/wuct/react-dom-utils.svg)](https://travis-ci.org/wuct/react-dom-utils)
[![Coveralls](https://img.shields.io/coveralls/wuct/react-dom-utils.svg)](https://coveralls.io/github/wuct/react-dom-utils)
[![Code Climate](https://img.shields.io/codeclimate/github/wuct/react-dom-utils.svg)](https://codeclimate.com/github/wuct/react-dom-utils)

[react-dom-utils](https://www.npmjs.com/package/react-dom-utils) let you create a throttled function, which only invokes the passed function at most once per animation frame on a browser or per 1000/60 ms on Node.

## Installation

`npm install react-dom-utils --save`

## Example

```
import React from 'react'
import throttle from 'raf-throttle'
import withMousePosition from '../src/withMousePosition.js'

const style = {
  width: 400,
  height: 400,
  backgroundColor: "#ECBDBB",
}

const component = ({ mousePosition }) => (
  <div style={style}>
    {JSON.stringify(mousePosition)}
  </div>
)

export default withMousePosition(throttle)(component)
```
