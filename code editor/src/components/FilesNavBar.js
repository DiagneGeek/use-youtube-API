import {files} from '../files.js';
import {Button} from './elements/Button.js'

export const FilesNavBar = () => {
  return `<nav class="w_full p-1 flex items-center gap-1 overflow-x-auto border-2">
    ${files().filter(f => f.open).map(f => {
      return Button(f.name, {second: f.isOpenned, className: 'text-second text-normal'})
    })
    }
  </nav>
`
}