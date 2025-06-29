import { createHTML } from "../../core/dom.js";
import { Router } from "../../core/router.js";

const rout = new Router();

rout.addrout("/", test);
rout.addrout("/about", () => console.log("hello this is the about page"));

rout.handleRouteChange();

import { jsx } from "./core/dom.js"; // or wherever jsx is defined
import { createElement } from "./core/dom.js"; // DOM rendering
import { render } from "./core/render.js"; // main render() entrypoint

function App() {
  return jsx("section", { className: "todoapp", id: "root" },
    jsx("header", { className: "header", "data-testid": "header" },
      jsx("h1", {}, "todos"),
      jsx("div", { className: "input-container" },
        jsx("input", {
          className: "new-todo",
          id: "todo-input",
          type: "text",
          "data-testid": "text-input",
          placeholder: "What needs to be done?",
        }),
        jsx("label", {
          className: "visually-hidden",
          htmlFor: "todo-input"
        }, "New Todo Input")
      )
    ),
    jsx("main", { className: "main", "data-testid": "main" },
      jsx("div", { className: "toggle-all-container" })
    ),
    jsx(Footer, {})
  );
}

function Footer() {
  return jsx("footer", { className: "info" },
    jsx("p", {}, "Double-click to edit a todo"),
    jsx("p", {}, "Created by the mini framework Team"),
    jsx("p", {},
      jsx("a", { href: "http://todomvc.com" }, "TodoMVC")
    )
  );
}

render(App);

// const element = createHTML(
//     "div",
//     {
//         className: "div",
//         id: "1",
//         textContent: "hello how are you",
//     },
//     createHTML("div", {
//         className: "div",
//         id: "2",
//         textContent: "ele2",
//     }, createHTML("span", {
//         className: "div",
//         id: "2",
//         textContent: " nested element",
//     }))
// );

// document.body.appendChild(element);

//--------------this is my code
// function Count({start}) {
//     const [count, setCount] = useState(start)
//     return jsx(
//         "div", 
//         null,
//         jsx("button", {onclick:()=>setCount(count+1) }, `count is ${count}`)
//     );
// }

// function App(){
//     const [text, setText] = useState("");
//     useEffect(() => {
//         console.log("hello world");
        
//     }, []);
//     return jsx(
//         "div", 
//         null,
//         jsx("h1", null, "Simple React by Walid"),
//         jsx(Count,{start:0}),
//         jsx("p", null, text),
//         jsx("button", {onclick: ()=>setText("this is Tach")}, "click Me")
//     );
//     // return jsx("h1", {className: "new"}, "hello world")
// }

// render();