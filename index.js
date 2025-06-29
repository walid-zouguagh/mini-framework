import {htmlToObject } from "./core/Vdom/create.js"
import { objectToHTML } from "./core/Vdom/render.js";

// console.log("hihi");

import { createHTML } from "./core/dom.js";


// const htmlString = `
// <html>
//   <div class="nameSubm">
    //<p>azert</p>
//     <input type="text" placeholder="Insert Name" />
//     <input type="submit" placeholder="Submit" />
//   </div>
// </html>
// `;

const root = document.getElementById("root")
const element = createHTML("div", { className: "div"},document.createTextNode('hi dear'))
root.appendChild(element)
console.log(root);

const objet = (htmlToObject(root));
console.log(objet);
console.log(objectToHTML(objet));



// root.append(element)
// const parser = new DOMParser();
// const doc = parser.parseFromString(root, 'text/html');
// console.log(doc);


// const result = htmlToObject(doc.documentElement);
// console.log(JSON.stringify(result, null, 2));



