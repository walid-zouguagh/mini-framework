import { htmlToObject } from "./core/diffing.js";

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
const element = createHTML("div", { className: "div", textContent: "hello" })
root.appendChild(element)
console.log(root);

console.log(htmlToObject(root));

// root.append(element)
// const parser = new DOMParser();
// const doc = parser.parseFromString(root, 'text/html');
// console.log(doc);


// const result = htmlToObject(doc.documentElement);
// console.log(JSON.stringify(result, null, 2));



