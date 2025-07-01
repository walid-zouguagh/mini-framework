import { diffAndApply } from "./core/Vdom/diffing.js";
import { objectToHTML } from "./core/Vdom/render.js";



const oldVNode = {
  tag: "div",
  attrs: { class: "box" },
  children: [
    { type: "text", content: "Hello" },
    { tag: "span", attrs: {}, children: [] }
  ]
};

const newVNode = {
  tag: "div",
  attrs: { class: "container" },
  children: [
    { type: "text", content: "Hello World" },
    { tag: "span", attrs: { style: "color:red" }, children: [] },
    { tag: "p", attrs: {}, children: [  { type: "text", content: "wa9ila hadchi khdammmm§§§" }]}
      
  ]
};

diffAndApply(oldVNode, newVNode);
console.log("objet",oldVNode);
console.log("html",objectToHTML(oldVNode));



let rout = document.getElementById("root")
rout = objectToHTML(oldVNode)

console.log(rout);


console.log(oldVNode);