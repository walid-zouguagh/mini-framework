export function diff(oldNode, newNode) {
  const patches = [];
  let index = 0; 

  walk(oldNode, newNode, patches, index);



  

  return patches;
}

function walk(oldNode, newNode, patches, index) {
  const currentPatch = [];
  if (index == 3 ){
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
    console.log(oldNode,newNode);
    
    
  }

  if (!newNode) {
    console.log("indexfinwssl",index);
    console.log("node fin wassl",oldNode);
    
  
    currentPatch.push({ type: "REMOVE", index });
  } else if (!oldNode) {
    currentPatch.push({ type: "ADD", newNode, index });
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode.content !== newNode.content) {
      currentPatch.push({ type: "TEXT", content: newNode.content, index });
    }
  } else if (oldNode.tag === newNode.tag) {
    const attrPatches = diffAttrs(oldNode.attrs, newNode.attrs);
    if (Object.keys(attrPatches).length > 0) {
      currentPatch.push({ type: "ATTRS", attrs: attrPatches, index });
    }

    diffChildren(oldNode.children || [], newNode.children || [], patches, index);
  } else {
    currentPatch.push({ type: "REPLACE", newNode, index });
  }

  if (currentPatch.length > 0) {
    patches.push({ index, changes: currentPatch });
  }
}

function isTextNode(node) {
  return node && node.type === "text";
}

function diffAttrs(oldAttrs = {}, newAttrs = {}) {
  const patches = {};

  for (const key in newAttrs) {
    if (newAttrs[key] !== oldAttrs[key]) {
      patches[key] = newAttrs[key];
    }
  }

  for (const key in oldAttrs) {
    if (!(key in newAttrs)) {
      patches[key] = null;
    }
  }

  return patches;
}

function diffChildren(oldChildren, newChildren, patches, parentIndex) {
  const maxLen = Math.max(oldChildren.length, newChildren.length);

  
  
  let currentIndex = parentIndex;

  for (let i = 0; i < maxLen; i++) {
    currentIndex++;

    walk(oldChildren[i], newChildren[i], patches, currentIndex);

  }
}


