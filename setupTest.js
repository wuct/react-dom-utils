global.document = require('jsdom').jsdom('<body></body>')
global.window = document.defaultView
global.navigator = window.navigator

// remove after this pr merged
// https://github.com/wnr/element-resize-detector/pull/46
global.getComputedStyle = document.defaultView.getComputedStyle
