import { objectToHTML } from "./render.js";

let globalDomIndex = 0;

export function patch(node, patches) {
  walkPatch(node, patches);
}

function walkPatch(node, patches) {
  const currentPatches = patches.filter((p) => p.index === globalDomIndex);

  if (currentPatches) {
    currentPatches.map((currentPatche) => {
      console.log("currentPatche", currentPatche);

      applyPatches(node, currentPatche.changes);
    });
  }

  let childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    globalDomIndex++;
    walkPatch(childNodes[i], patches);
  }
}

function applyPatches(node, changes) {
  console.log("les changements", changes);

  changes.forEach((change) => {
    switch (change.type) {
      case "TEXT":
        node.textContent = change.content;
        break;
      case "ATTRS":
        for (let key in change.attrs) {
          const value = change.attrs[key];
          if (value === null) {
            node.removeAttribute(key);
          } else {
            node.setAttribute(key, value);
          }
        }
        break;
      case "REMOVE":
        console.log("hi");
        console.log("node que sera effaces", node.parentNode);
        node.parentNode.removeChild(node);
        break;
      case "ADD":
        const newNode = objectToHTML(change.newNode);
        node.appendChild(newNode);
        break;
      case "REPLACE":
        const replacedNode = objectToHTML(change.newNode);
        node.parentNode.replaceChild(replacedNode, node);
        break;
    }
  });
}
