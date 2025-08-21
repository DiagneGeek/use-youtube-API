import { files, setFiles } from '../files.js';

export const removeFile = (id) => {
  setFiles(prev => [...prev.filter(f => f.id != id)])
  return files().find(f => f.id == id)
}