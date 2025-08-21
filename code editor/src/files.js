import {useState} from './lib/reactivity.js';

export const [files, setFiles, filesId] = useState([
  {
    name: 'index.html',
    path: '/index.html',
    parent: '/',
    content: 'Hello',
    id: 'file-auto',
    type: 'html',
    open: true,
    isOpen: true
  }
])