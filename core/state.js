import { render } from "./render.js";

// Create function the useState
let states = []; // ["walid"]
// let stateIndex = null;//
let stateIndex = 0;

export function useState(initialValue) {
  // "walid"
  const currentIndex = stateIndex; // null //                     // true             false

  // states[currentIndex] = states[currentIndex] !== undefined ? states[currentIndex] : initialValue; // walid
  if (states[currentIndex] === undefined) {
    states[currentIndex] = initialValue;
  }
  // const [name, setName] = useState(value)
  function setstate(newValue) {
    states[currentIndex] = newValue;
    stateIndex = 0;
    render();
  }
  // stateIndex = stateIndex ? 0 : stateIndex++;
  stateIndex++;
  return [states[currentIndex], setstate];
}

export function jsx(tag, props, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  return { tag, props: props || {}, children };
}

// Create function the useEffect
// useEffect(callfunction(), [name])
// let effects = [];
// // let effectIndex = null;
// let effectIndex = 0;
// export function useEffect(callback, dependencies) {
//   const oldDependencies = effects[effectIndex];
//   let hasChanged = true;

//   if (oldDependencies) {
//     hasChanged = dependencies.some(
//       (dep, i) => !Object.is(dep, oldDependencies[i])
//     );
//   }

//   if (hasChanged) {
//     callback();
//   }
//   effects[effectIndex] = dependencies;
//   // effectIndex = effectIndex ? 0 : effectIndex++;
//   effectIndex++;
// }
