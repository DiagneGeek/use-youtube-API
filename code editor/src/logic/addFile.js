import { setFiles } from '../files.js';

export const addFile = (name, parent) => {
  const path = parent + name
  const type = name.split('.')[name.split('.').length -1]
  
  const id = path + Date.now()
  
  const item = {
    name,
    path,
    type,
    id,
    content: ''
  }
  setFiles(prev => [...prev, {...item}])
  
  return item
}