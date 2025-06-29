



let globalIndex =0;

// const vdom = {
//   tag: '',
//   attrs: { class: '' },
//   children: [
//     {
//       tag: '',
//       children: ['']
//     },
//     {
//       tag: null, 
//       children: [
//         { tag: '', children: [''] },
//         { tag: '', children: [''] },
//       ]
//     }
//   ]
// };

// const DiffingObject = {
//   oldVDOM: vdom,
//   newVDOM: null,

//   update(rootDomElement) {
//     if (!this.oldVDOM) {
//       // First render: create and append the DOM from newVDOM
//       const dom = createHTML(this.newVDOM);
//       rootDomElement.appendChild(dom);
//     }else if (!this.newVDOM){




//     }
//      else {
//       // Calculate patches and apply them
//       const patches = diff(this.oldVDOM, this.newVDOM);
//       patch(rootDomElement, patches);
//     }

//     // Update oldVDOM for the next render cycle
//     this.oldVDOM = this.newVDOM;
//   }
// };
// const diff=(OldVdom,NewVdom)=>{
//   if (!NewVdom){
//     return 
//   }




// }


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

