import {htmlToObject } from "./core/Vdom/create.js"
import { diff } from "./core/Vdom/diffing.js";
import {  patch } from "./core/Vdom/patch.js";
import { objectToHTML } from "./core/Vdom/render.js";

console.log("🌱 Démarrage du Virtual DOM test...");

// Récupère l'élément réel existant dans le HTML
const root = document.getElementById("root");
const first = root
console.log("first",first);



// 1️⃣ Convertit en Virtual DOM
const oldTree = htmlToObject(root);
console.log("✅ oldTree (Virtual DOM) :", oldTree);

// // 2️⃣ Crée un nouveau Virtual DOM
// // Ici tu peux changer ce que tu veux tester
const newTree = {
  tag: "div",
  attrs: { id: "app" },
  children: [
    {
      tag: "h2",
      attrs: { class: "title" },
      children: [
        { type: "text", content: "Hello Virtual DOM!" }
      ]
    },
    {
      tag: "p",
      attrs: { class: "description" },
      children: [
        { type: "text", content: "Ceci est un test." }
      ]
    }
  ]
};

console.log("✅ newTree (Virtual DOM) :", newTree);

// // 3️⃣ Diff
const patches = diff(oldTree, newTree);
console.log("✅ Patches calculés :", patches);

// // 4️⃣ Applique les changements sur le vrai DOM
// // IMPORTANT: réinitialiser l'index global
globalThis.globalDomIndex = 0;
patch(root, patches);

console.log("✅ Changements appliqués !");

// 5️⃣ Affiche le résultat final
console.log("✅ DOM après patch :", root);

// 6️⃣ Si tu veux, reconstruire le DOM complet à partir du Virtual DOM
const freshNode = objectToHTML(newTree);
document.body.appendChild(freshNode);
