import { render } from "./render.js";

let states = [];
export let stateIndex = 0;

export function resetStateIndex() {
  stateIndex = 0;
}

export function useState(initialValue) {
  const currentIndex = stateIndex;
  console.log("222222222", initialValue, "initialValue");

  console.log("1111111111111", states);

  if (states[currentIndex] === undefined) {
    states[currentIndex] = initialValue;
  }

  function setState(newValue) {
    console.log("new value", typeof newValue);
    if (typeof newValue === "function") states[currentIndex] = newValue();
    else states[currentIndex] = newValue;
    render();
  }

  stateIndex++; // Move to next state slot
  return [states[currentIndex], setState];
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
