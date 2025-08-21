import {files} from '../files.js';

export const File = (info) => {
 const content = files().find(f => f.isOpen) || {content: 'any file opened'}
  return `
   <div class='w-full h_85svh p-2'>
     ${content.content}
   </div>
  `
}