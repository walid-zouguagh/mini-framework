
import { jsx } from "../../core/dom.js";
import { rout, Router } from "../../core/router.js";
import { useState } from "../../core/state.js";
// import { render } from "../../core/Vdom/render.js";


// let [text, SetText] = useState("")
function Footer() {
  return jsx("footer", { class: "info" },
    jsx("p", {}, "Double-click to edit a todo"),
    jsx("p", {}, "Created by the mini framework Team"),
    jsx("p", {},
      jsx("a", { href: "http://todomvc.com" }, "TodoMVC")
    )
  );
}

function App() {
  let [todo, SetTodo] = useState([]);

  // console.log(todo, "fgfdg");

  return jsx("section", { class: "todoapp", id: "root" },
    jsx("header", { class: "header", "data-testid": "header" },
      jsx("h1", {}, "todos"),
      jsx("div", { class: "input-container" },
        jsx("input", {
          class: "new-todo",
          id: "todo-input",
          type: "text",
          "data-testid": "text-input",
          placeholder: "What needs to be done?",
          onkeydown: (e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              SetTodo([...todo, e.target.value.trim()]);
              e.target.value = ""; // clearr input after adding
            }
          },
        }),
        jsx("label", {
          class: "visually-hidden",
          htmlFor: "todo-input"
        }, "New Todo Input")
      )
    ),
    jsx("main", { class: "main", "data-testid": "main" },
      jsx("div", { class: "toggle-all-container" },
        ...todo.map((c, i) => jsx("p", { key: i }, c))
      )
    ),
    jsx(Footer, {})
  );
}



rout.addrout("/", App);
rout.addrout("/about", () => console.log("hello this is the about page"));
rout.handleRouteChange();

// render(App);

