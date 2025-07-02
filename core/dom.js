export function createHTML(tag, attrs, ...children) {
  console.log(tag, attrs, ...children);

  const el = document.createElement(tag);

  // Appliquer les attributs
  for (const [key, value] of Object.entries(attrs)) {
    if (typeof value === "function" && key.startsWith("on")) el[key] = value;
    else el.setAttribute(key, value);
  }

  // Ajouter les enfants
  if (children) {
    for (const child of children) {
      if (typeof child === "string") {
        const TextNod = document.createTextNode(child);
        el.appendChild(TextNod);
        // return;
      } else {
        console.log(child);
        el.appendChild(child);
      }
    }
  }

  return el;
}

export const root = document.getElementById("root");
