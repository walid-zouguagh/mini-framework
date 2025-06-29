export function createHTML(tag, attrs, ...children) {
  const el = document.createElement(tag);

  // Appliquer les attributs
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }

  // Ajouter les enfants
  for (const child of children) {
    if (typeof child === "string"){
    const TextNod = document.createTextNode(child)
    el.appendChild(TextNod)
    return
    }

    
    el.appendChild(child);
  }

  return el;
}

