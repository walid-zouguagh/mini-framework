import { createHTML } from "./dom";






const vdom = {
  tag: '',
  attrs: { class: '' },
  children: [
    {
      tag: '',
      children: ['']
    },
    {
      tag: null, 
      children: [
        { tag: '', children: [''] },
        { tag: '', children: [''] },
      ]
    }
  ]
};

const DiffingObject = {
  oldVDOM: vdom,
  newVDOM: null,

  update(rootDomElement) {
    if (!this.oldVDOM) {
      // First render: create and append the DOM from newVDOM
      const dom = createHTML(this.newVDOM);
      rootDomElement.appendChild(dom);
    }else if (!this.newVDOM){




    }
     else {
      // Calculate patches and apply them
      const patches = diff(this.oldVDOM, this.newVDOM);
      patch(rootDomElement, patches);
    }

    // Update oldVDOM for the next render cycle
    this.oldVDOM = this.newVDOM;
  }
};
const diff=(OldVdom,NewVdom)=>{
  if (!NewVdom){
    return 
  }




}
export function htmlToObject(element) {
  if (element.nodeType === Node.TEXT_NODE && element.textContent.trim() === '') {
    return null; 
  }

  const obj = {
    tag: element.tagName.toLowerCase(),
    attrs: {},
  };

  for (let attr of element.attributes || []) {
    obj.attrs[attr.name] = attr.value;
  }

  if (element.children.length > 0) {
    obj.children = [];
    for (let child of element.children) {
      const childObj = htmlToObject(child);
      if (childObj) {
        obj.children.push(childObj);
      }
    }
  }

  return obj;
}
