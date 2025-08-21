import {useState, useEffect, useRef, onMount} from '../lib/reactivity.js';
import {files} from '../files.js'

import {addFile} from '../logic/addFile.js'


export const SideBar = (currentPath) => {
 const sidebarContent = () => files().map(f => {
  return `
          <div
            class='w-full p-2 text-${f.isOpen ? 'main' : 'second'} bg-${f.isOpen ? 'second' : 'third'}  rounded'
          >${f.name}</div>
        `
}).join('')

let sb = ''

  onMount(() => {
  useRef('#sb-add-file').addEventListener('click', e => {
    addFile('main.css', currentPath())
    console.log(files())
  })
  
  useEffect(() => {
    useRef('#sb-files').innerHTML = sidebarContent()
  })
  
  sb = useRef('.sidebar')
  
  const openSbBtn = useRef('#openSbBtn')
  const closeSbBtn = useRef('#closeSbBtn')
  
  openSbBtn.addEventListener('click', toggleSb)
  closeSbBtn.addEventListener('click', toggleSb)
  })
  
  const toggleSb = () => {
    sb.classList.toggle("translate")
  }
  
  return `<section class='translate-0 sidebar w_300px h-full flex flex-col  items-center border rounded-sm p-2 relative'>
    <button
    class='bg-transparent text-main absolute top_16px left_8px'
    id="closeSbBtn"
    onclick=''
    >close</button>
   <h2>Sidebar</h2>
    <div class='flex justify-center gap-2 my-3 border-b pb-4 border-width-1'>
      <button 
        id='sb-add-file'
      class='bg-third p-2 rounded text-white'>Add file</button>
    <button 
        id='sb-add-folder'
      class='bg-third p-2 rounded text-white'>Add folder</button>
    </div>
    
    <div id="sb-files" class='flex flex-col gap-2 w-full'>
      ${sidebarContent()}
    </div>
  </section>`
}