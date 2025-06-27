const vnodeComplex = {
  tag: 'section',
  attrs: { class: 'container' },
  children: [
    {
      tag: 'h1',
      children: ['Title']
    },
    {
      tag: null, 
      children: [
        { tag: 'p', children: ['Paragraph 1'] },
        { tag: 'p', children: ['Paragraph 2'] },
      ]
    }
  ]
};

const DiffingObject = {
  oldVDOM: null,
  newVDOM: null,

  update(rootDomElement) {
    if (!this.oldVDOM) {
      // First render: create and append the DOM from newVDOM
      const dom = createElement(this.newVDOM);
      rootDomElement.appendChild(dom);
    } else {
      // Calculate patches and apply them
      const patches = diff(this.oldVDOM, this.newVDOM);
      patch(rootDomElement, patches);
    }

    // Update oldVDOM for the next render cycle
    this.oldVDOM = this.newVDOM;
  }
};
