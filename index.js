import { diffAndApply } from "./core/Vdom/diffing.js";
import { objectToHTML } from "./core/Vdom/render.js";
import {htmlToObject} from "./core/Vdom/create.js"



const oldVNode = htmlToObject(document.getElementById("root"));
console.log("oldVdome",oldVNode);


const VNode = {
  tag: "div",
  attrs: { class: "container" },
  children: [
    { type: "text", content: "Hello World" },
  
  ]
};
console.log("Newvdome",VNode);



diffAndApply(oldVNode, VNode);
console.log(oldVNode);

//console.log("objet",oldVNode);
//console.log("html",objectToHTML(oldVNode));






// console.log(oldVNode);