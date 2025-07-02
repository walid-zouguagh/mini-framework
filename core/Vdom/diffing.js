import { root } from "../dom.js";
import { htmlToObject } from "./create.js";
import { objectToHTML } from "./render.js";

export function diffAndApply(oldNode, newNode) {
  walk(oldNode, newNode, null, null);
}

export function UpdateDOM(new_elements) {
  console.log(root);

  diffAndApply(htmlToObject(root), root.append(new_elements));
}

function walk(oldNode, newNode, parentNode, indexInParent) {
  console.log(indexInParent);
  console.log("newnod", newNode);
  console.log("oldnode", oldNode);
  console.log("parent", parentNode);
  console.log("----------------------------------------");

  if (!newNode) {
    console.log(indexInParent, "pppppppppppppppppppppppp", oldNode);

    if (parentNode && indexInParent !== null) {
      parentNode.children.splice(indexInParent);
    }
    return;
  }

  if (!oldNode) {
    if (parentNode && indexInParent !== null) {
      parentNode.children.splice(indexInParent, 0, newNode);
    }
    return;
  }

  if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode.content !== newNode.content) {
      oldNode.content = newNode.content;
    }
    return;
  }

  if (oldNode.tag !== newNode.tag) {
    console.log(indexInParent);
    console.log(oldNode.tag);
    console.log(newNode.tag);

    if (parentNode && indexInParent !== null) {
      parentNode.children[indexInParent] = newNode;
      console.log(parentNode.children[indexInParent]);
    }
    return;
  }

  updateAttrs(oldNode, newNode);

  diffChildren(oldNode, newNode);
}

function isTextNode(node) {
  return node && node.type === "text";
}

function updateAttrs(oldNode, newNode) {
  oldNode.attrs = oldNode.attrs || {};
  newNode.attrs = newNode.attrs || {};

  for (const key in newNode.attrs) {
    oldNode.attrs[key] = newNode.attrs[key];
  }

  for (const key in oldNode.attrs) {
    if (!(key in newNode.attrs)) {
      delete oldNode.attrs[key];
    }
  }
}

function diffChildren(oldNode, newNode) {
  const oldChildren = oldNode.children || [];
  const newChildren = newNode.children || [];
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    walk(oldChildren[i], newChildren[i], oldNode, i);
  }
  
}
