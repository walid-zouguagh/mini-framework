import { createHTML } from "../dom.js";

//Tu le rends en vrai DOM avec render()

export function objectToHTML(vNode) {
  if (vNode.type === 'text') {
    return document.createTextNode(vNode.content);
  }

  const children = (vNode.children || []).map(objectToHTML);
  return createHTML(vNode.tag, vNode.attrs || {}, ...children);
}
