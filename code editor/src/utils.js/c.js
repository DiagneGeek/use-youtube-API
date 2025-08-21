export const c = (cds, defaultFunc = null) => {
  let isTrue = false
  for (let cd of cds) {
    if (cd[0]) {
      isTrue = true
      cd[1]()
      break
    }
  }
  if (!isTrue && defaultFunc) defaultFunc()
}