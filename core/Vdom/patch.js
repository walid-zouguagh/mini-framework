let globalDomIndex = 0;

function patch(node, patches) {
  walkPatch(node, patches);
}

function walkPatch(node, patches) {
  const currentPatches = patches.find(p => p.index === globalDomIndex);

  if (currentPatches) {
    applyPatches(node, currentPatches.changes);
  }

  let childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    globalDomIndex++;
    walkPatch(childNodes[i], patches);
  }
}

function applyPatches(node, changes) {
  changes.forEach(change => {
    switch (change.type) {
      case 'TEXT':
        node.textContent = change.content;
        break;
      case 'ATTRS':
        for (let key in change.attrs) {
          const value = change.attrs[key];
          if (value === null) {
            node.removeAttribute(key);
          } else {
            node.setAttribute(key, value);
          }
        }
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node);
        break;
      case 'ADD':
        const newNode = render(change.newNode);
        node.appendChild(newNode);
        break;
      case 'REPLACE':
        const replacedNode = render(change.newNode);
        node.parentNode.replaceChild(replacedNode, node);
        break;
    }
  });
}
