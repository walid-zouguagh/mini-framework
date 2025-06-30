



let globalIndex =0;



export function diff(oldNode, newNode) {
  const patches = [];

  walk(oldNode, newNode, patches, 0);
   
  return patches;
}
function walk(oldNode, newNode, patches, index) {
  const currentPatch = [];
           
  if (!newNode) {                                                   
    currentPatch.push({ type: 'REMOVE', index });
  } else if (!oldNode) {
    currentPatch.push({ type: 'ADD', newNode });
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode.content !== newNode.content) {
      currentPatch.push({ type: 'TEXT', content: newNode.content });
    }
  } else if (oldNode.tag === newNode.tag) {
    const attrPatches = diffAttrs(oldNode.attrs, newNode.attrs);
    if (Object.keys(attrPatches).length > 0) {
      currentPatch.push({ type: 'ATTRS', attrs: attrPatches });
    }

    diffChildren(oldNode.children || [], newNode.children || [], patches, index);
  } else {
    currentPatch.push({ type: 'REPLACE', newNode });
  }

  if (currentPatch.length > 0) {
    patches.push({ index, changes: currentPatch });
  }
}
function isTextNode(node) {
  return node && node.type === 'text';
}
function diffAttrs(oldAttrs = {}, newAttrs = {}) {
  const patches = {};

  // Changements ou ajouts
  for (let key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) {
      patches[key] = newAttrs[key]; 
    }
  }

  // Suppressions
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      patches[key] = null;
    }
  }

  return patches;
}
function diffChildren(oldChildren, newChildren, patches, parentIndex) {
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < maxLen; i++) {
    walk(oldChildren[i], newChildren[i], patches, ++globalIndex);
  }
}

