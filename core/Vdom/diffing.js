import { createHTML } from "../dom.js";






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
