import {callMounts} from '../lib/reactivity.js';
import {App} from './app.js'

import {init} from '../lib/dicss/index.js';

export const render = (s) => {
  const html = init(App())
  document.querySelector(s).innerHTML = html
  callMounts()
}