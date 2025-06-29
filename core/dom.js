export function createHTML(tag, atri, ...children) {
    const element = document.createElement(tag);
    //   const [key, value] = Object.entries(atri);

    for (const key in atri) {
        // console.log(key, atri[key]);
        element[key] = atri[key];
    }
    //   console.log(element);
    element.append(...children)
    return element;
}
