const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const dom = new JSDOM("<!DOCTYPE html><body></body>");

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
