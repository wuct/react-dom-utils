const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
const jsdom = require("jsdom");

configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;

const dom = new JSDOM("<!DOCTYPE html><body></body>");

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
