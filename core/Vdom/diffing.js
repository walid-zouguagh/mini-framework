export function diffAndApply(oldNode, newNode) {
  walk(oldNode, newNode, null, null);
}

function walk(oldNode, newNode, parentNode, indexInParent) {
  if (!newNode) {
    // Supprimer ce nœud de son parent
    if (parentNode && indexInParent !== null) {
      parentNode.children.splice(indexInParent, 1);
    }
    return;
  }

  if (!oldNode) {
    // Ajouter un nouveau nœud dans le parent
    if (parentNode && indexInParent !== null) {
      parentNode.children.splice(indexInParent, 0, newNode);
    }
    return;
  }

  if (isTextNode(oldNode) && isTextNode(newNode)) {
    // Mettre à jour le contenu texte
    if (oldNode.content !== newNode.content) {
      oldNode.content = newNode.content;
    }
    return;
  }

  if (oldNode.tag !== newNode.tag) {
    // Remplacer entièrement ce nœud
    if (parentNode && indexInParent !== null) {
      parentNode.children[indexInParent] = newNode;
    }
    return;
  }

  // Si le tag est le même, mettre à jour les attributs
  updateAttrs(oldNode, newNode);

  // Synchroniser les enfants récursivement
  diffChildren(oldNode, newNode);
}

function isTextNode(node) {
  return node && node.type === "text";
}

function updateAttrs(oldNode, newNode) {
  oldNode.attrs = oldNode.attrs || {};
  newNode.attrs = newNode.attrs || {};

  // Mettre à jour ou ajouter les nouveaux attributs
  for (const key in newNode.attrs) {
    oldNode.attrs[key] = newNode.attrs[key];
  }

  // Supprimer les attributs absents
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
