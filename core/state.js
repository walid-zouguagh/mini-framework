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
    render();
  }
  // stateIndex = stateIndex ? 0 : stateIndex++;
  stateIndex++;
  return [states[currentIndex], setstate];
}

// Create function the useEffect
// useEffect(callfunction(), [name])
let effects = [];
// let effectIndex = null;
let effectIndex = 0;
export function useEffect(callback, dependencies) {
  const oldDependencies = effects[effectIndex];
  let hasChanged = true;

  if (oldDependencies) {
    hasChanged = dependencies.some(
      (dep, i) => !Object.is(dep, oldDependencies[i])
    );
  }

  if (hasChanged) {
    callback();
  }
  effects[effectIndex] = dependencies;
  // effectIndex = effectIndex ? 0 : effectIndex++;
  effectIndex++;
}

export function jsx(tag, props, ...children) {
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }
  return { tag, props: props || {}, children };
}

// export default function createElement(node){
//     if (typeof node === "string" || typeof node === "number"){
//         return document.createTextNode(String(node));
//     }
//     const element = document.createElement(node.tag);
//     for (let [name, value] of Object.entries(node.props)){
//         if(name.startsWith("on") && typeof value == "function"){
//             element.addEventListener(name.slice(2).toLowerCase(), value)
//         }else if (name == "className"){
//             element.className = value;
//         }else if (name == "id"){
//             element.id = value;
//         }else{
//             element.setAttribute(name, value);
//         }
//     }

//     for (let child of node.children.flat()){
//         if (typeof child == "string" || typeof child == "number"){
//             element.appendChild(document.createTextNode(String(child)))
//         }else{
//             element.appendChild(createElement(child))
//         }
//     }
//     return element;
// }
