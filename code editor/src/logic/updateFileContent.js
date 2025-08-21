import { files, setFiles } from '../files.js';

export const updateFileContent = (value, id) => {
  const index = files().findIndex(f => f.id == id)
  const clone = [...files()]
  clone[index].content = value
  setFiles(clone)
  return files()[index]
}