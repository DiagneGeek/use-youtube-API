import {File} from '../components/File.js';
import {SideBar} from '../components/SideBar.js';
import {FilesNavBar} from '../components/FilesNavBar.js';
import {Button} from '../components/elements/Button.js'

import {useState} from '../lib/reactivity.js';

export const App = () => {
  let [currentPath, setCurrentPath] = useState('/')
  
  return `<div class='bg-main h-full'>
    <div class='w-full py-2 px-2 flex justify-between items-center'>
     <p>diEditor</p>
     ${Button('Sidebar', {second: true, props='id="openSbBtn"'})}
    </div>
    
    ${SideBar(currentPath)}
   <section>
    ${FilesNavBar()}
    <div id='code-editor'>
      ${File()}
    </div>
   </section>
  </div>`
}