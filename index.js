import {htmlToObject } from "./core/Vdom/create.js"
import { objectToHTML } from "./core/Vdom/render.js";
import { diff } from "./core/Vdom/diffing.js";

// console.log("hihi");

import { createHTML } from "./core/dom.js";

const root1 = document.getElementById("root")
const root2 = document.getElementById("root2")

const obj1= htmlToObject(root1);
const obj2=htmlToObject(root2)
console.log(diff(obj1,obj2));


 
 
 
 


const element = createHTML("div", { className: "div"},document.createTextNode('hi dear'))
// root.appendChild(element)
// console.log(root);

// const objet = (htmlToObject(root));
// console.log(objet);
// console.log(objectToHTML(objet));



// root.append(element)
// const parser = new DOMParser();
// const doc = parser.parseFromString(root, 'text/html');
// console.log(doc);


// const result = htmlToObject(doc.documentElement);
// console.log(JSON.stringify(result, null, 2));



