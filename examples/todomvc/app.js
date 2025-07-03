
import { Router } from "../../core/router.js";
import { createHTML, jsx, createElement } from "/core/dom.js";
import { render } from "../../core/Vdom/render.js";

function Footer() {
  return jsx("footer", { className: "info" },
    jsx("p", {}, "Double-click to edit a todo"),
    jsx("p", {}, "Created by the mini framework Team"),
    jsx("p", {},
      jsx("a", { href: "http://todomvc.com" }, "TodoMVC")
    )
  );
}

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

const rout = new Router();
rout.addrout("/", App);
rout.addrout("/about", () => console.log("hello this is the about page"));
rout.handleRouteChange();

render(App);

