const stateStore = []

// 🔁 Reactive effects to re-run when specific state values change
const reactiveEffects = []

// 🧼 Lifecycle callbacks
const mountCallbacks = []
const destroyCallbacks = []

let currentEffect = null

// 🧪 Keeps track of the function used to re-render the UI
export let cleanUp = () => {
  stateCursor = 0
  reactiveEffects.length = 0
  mountCallbacks.length = 0
  destroyCallbacks.length = 0
  stateStore.length = 0
}

// ▶️ Triggers all reactive effects watching the given `id`
const triggerEffects = (id, oldValue, newValue) => {
  reactiveEffects.forEach(effect => {
    if (effect.dependencies.includes(id)) {
      effect.callback(oldValue, newValue)
    }
  })
}

// 👉 Used to assign a new state slot
let stateCursor = 0

/**
 * Creates a reactive state variable
 * @param {any} initialValue - The initial state
 * @returns {[any, Function, number]} - [value, setter function, unique ID]
 */
export const useState = (initialValue, from='') => {
  const index = stateCursor
  let stateId = stateStore[index]?.id
  if(from) console.log(from)
  
  // If this is a new state slot, initialize it
  if (stateStore[index] == undefined) {
    const id = Date.now() + Math.random() // avoid collisions
    stateStore.push({ value: initialValue, id })
    stateId = id
  }
  
  const currentValue = _ => {
    if(currentEffect) {
      
      currentEffect.dependencies.push(stateId)
    }
    return stateStore[index].value
  }
  
  const setValue = (newValue) => {
    const prevValue = stateStore[index].value
    if (typeof newValue == 'function') {
      newValue = newValue(prevValue)
    }
    if (newValue === prevValue) return newValue
    
    // Update the state
    stateStore[index].value = newValue
    
    // Call all effects that depend on this state
    triggerEffects(stateId, prevValue, newValue)
  }
  
  stateCursor += 1
  
  return [currentValue, setValue, stateId]
}


export const useEffect = (callback) => {
  currentEffect = {callback, dependencies: []}
  callback()
  console.log(currentEffect)
  reactiveEffects.push({...currentEffect})
  currentEffect = null
}


export const callMounts = () => {
  // Run all mount callbacks once after initial render
  mountCallbacks.forEach(fn => fn())
}

export const callDestroys = _ => {
  // Run all destroy callbacks
  destroyCallbacks.forEach(fn => fn())
  cleanUp()
}


export const onMount = (callback) => {
  mountCallbacks.push(callback)
}

export const onDestroy = (callback) => {
  destroyCallbacks.push(callback)
}

export const useRef = s => document.querySelector(s)