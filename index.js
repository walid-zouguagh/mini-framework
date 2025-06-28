

console.log("hihi");


const htmlString = `
<html>
  <div class="nameSubm">
    <input type="text" placeholder="Insert Name" />
    <input type="submit" placeholder="Submit" />
  </div>
</html>
`;

const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, 'text/html');
console.log(doc);


const result = htmlToObject(doc.documentElement); 
console.log(JSON.stringify(result, null, 2));



function htmlToObject(element) {
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
