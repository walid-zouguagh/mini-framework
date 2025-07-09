import { jsx } from "../../core/dom.js";
import { render } from "../../core/render.js";
import { rout } from "../../core/router.js";
import { useState } from "../../core/state.js";

let todoList = [];
let editId;

function filter_with_hash(hash, todos) {
  if (hash === "/" || hash === "#/") {
    return todos;  // Show all tasks
  } else if (hash === "#/active") {
    return todos.filter((todo) => !todo.done);  // Show active tasks (not completed)
  } else if (hash === "#/completed") {
    return todos.filter((todo) => todo.done);  // Show completed tasks
  }
  return todos;
}

function lengthTodo() {
  return todoList.filter((todo) => !todo.done).length;
}

function TodoActive() {
  return todoList.some((todo) => !todo.done);
}

// function UpdateAll() {
//   let done = TodoActive();
//   todoList = todoList.map((todo) => ({
//     text: todo.text,
//     id: todo.id,
//     done,
//   }));
//   render();
// }

function UpdateAll(todos, setTodos) {
  const done = todos.some((todo) => !todo.done);
  const updated = todos.map((todo) => ({ ...todo, done }));
  setTodos(updated);
}

// const saveEdit = (newText, id) => {
//   if (newText.trim().length <= 1) return;
//   todoList = todoList.map((todo) =>
//     todo.id === id ? { ...todo, text: newText } : todo
//   );
//   editId = undefined;
//   render();
// };
// const saveEdit = (newText, id, todos, setTodos) => {
//   if (newText.trim().length <= 1) return;
//   const updated = todos.map((todo) =>
//     todo.id === id ? { ...todo, text: newText } : todo
//   );
//   editId = undefined;
//   setTodos(updated);
// };

const saveEdit = (newText, id, todos, setTodos) => {
  if (newText.trim().length <= 1) return;
  const updated = todos.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  editId = undefined;
  setTodos(updated);
};

// const SetNewTodoList = (text, done = false, id = new Date()) => {
//   todoList.push({ text, done, id: id.getTime() });
//   render();
// };

const SetNewTodoList = (text, todos, setTodos, done = false) => {
  const newTodo = {
    text,
    done,
    id: Date.now(),
  };
  setTodos([...todos, newTodo]);
};

// const RemoveToList = (id) => {
//   todoList = todoList.filter((todo) => todo.id !== id);
//   console.log("after", todoList);

//   render();
// };
const RemoveToList = (id, todos, setTodos) => {
  setTodos(todos.filter((todo) => todo.id !== id));
};

// function clearCompleted() {
//   todoList = todoList.filter((todo) => !todo.done);
//   render();
// }
function clearCompleted(todos, setTodos) {
  setTodos(todos.filter((todo) => !todo.done));
}

// const AddToCommple = (id) => {
//   todoList = todoList.map((todo) =>
//     todo.id === id ? { ...todo, done: !todo.done } : todo
//   );
//   render();
// };

const AddToCommple = (id, todos, setTodos) => {
  const updated = todos.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  setTodos(updated);
};

function FooterInfo() {
  return jsx(
    "footer",
    { class: "info" },
    jsx("p", {}, "Double-click to edit a todo"),
    jsx("p", {}, "Created by the mini framework Team"),
    jsx("p", {}, jsx("a", { href: "http://todomvc.com" }, "TodoMVC"))
  );
}

function Header({ todos, setTodos }) {
  // const [test, setTest] = useState("test");
  return jsx(
    "header",
    { class: "header", "data-testid": "header" },
    jsx("h1", {}, "todos"),
    jsx(
      "div",
      { class: "input-container" },
      jsx("input", {
        class: "new-todo",
        id: "todo-input",
        type: "text",
        "data-testid": "text-input",
        placeholder: "What needs to be done?",
        onkeydown: (e) => {
          if (e.code === "Enter" && e.target.value.trim().length > 1) {
            // let newText = [...text, e.target.value.trim()];
            // function updatevalue() {
            //   if (!text) return [e.target.value.trim()];
            //   else return [...text, e.target.value.trim()];
            // }
            // setText(updatevalue);
            // // setTest(e.target.value.trim());

            // SetNewTodoList(e.target.value.trim(), false);

            function updatevalue() {
              if (!todos) return [e.target.value.trim()];
              else
                return [
                  ...todos,
                  {
                    text: e.target.value.trim(),
                    done: false,
                    id: Date.now(),
                  },
                ];
            }
            setTodos(updatevalue());
            e.target.value = "";
          }
        },
      }),
      jsx(
        "label",
        { class: "visually-hidden", for: "todo-input" },
        "New Todo Input"
      )
    )
  );
}

function Footer({ filter, setFilter, todos, setTodos }) {
  return jsx(
    "footer",
    { class: "footer", "data-testid": "footer" },
    jsx("span", { class: "todo-count" }, `${lengthTodo()} item(s) left!`),
    jsx(
      "ul",
      { class: "filters", "data-testid": "footer-navigation" },
      jsx(
        "li",
        {},
        jsx(
          "a",
          {
            class: filter === "all" ? "selected" : "",
            href: "#/",
            onclick: (e) => {
              e.preventDefault()
              rout.navigate("/#")
              setFilter("all")
            }
          },
          "All"
        )
      ),
      jsx(
        "li",
        {},
        jsx(
          "a",
          {
            class: filter === "active" ? "selected" : "",
            // href: "#/active",
            onclick: (e) => {
              e.preventDefault()
              rout.navigate("/#/active")
              setFilter("active")
            }
          },
          "Active"
        )
      ),
      jsx(
        "li",
        {},
        jsx(
          "a",
          {
            class: filter === "completed" ? "selected" : "",
            // href: "#/completed",
            onclick: (e) => {
              e.preventDefault()
              rout.navigate("/#/completed")

              setFilter("completed")
            }
          },
          "Completed"
        )
      )
    ),
    jsx(
      "button",
      {
        class: "clear-completed",
        onclick: () => clearCompleted(todos, setTodos),
      },
      "Clear completed"
    )
  );
}

function MainSection({ todos, setTodos, filter }) {

  const showList = filter_with_hash(`#/${filter}`, todos);
  const allCompleted = todos.length > 0 && todos.every((todo) => todo.done);
  // function toggleTodo(id) {
  //   const updated = todos.map((todo) =>
  //     todo.id === id ? { ...todo, done: !todo.done } : todo
  //   );
  //   setTodos(updated);
  // }
  return jsx(
    "main",
    { class: "main", "data-testid": "main" },
    jsx(
      "div",
      { class: "toggle-all-container" },
      todos.length > 0 &&
      jsx("input", {
        class: "toggle-all",
        type: "checkbox",
        id: "toggle-all",
        "data-testid": "toggle-all",
        onclick: () => UpdateAll(todos, setTodos),
        checked: allCompleted,
      }),
      todos.length > 0 &&
      jsx(
        "label",
        {
          class: "toggle-all-label",
          for: "toggle-all",
          onclick: () => UpdateAll(todos, setTodos),
        },
        "Toggle All Input"
      )
    ),
    todos.length > 0 &&
    jsx(
      "ul",
      { class: "todo-list", "data-testid": "todo-list" },
      ...showList.map((todo) =>
        jsx(
          "li",
          {
            class: todo.done ? "completed" : "",
            "data-testid": "todo-item",
            "key": todo.id,
          },
          jsx(
            "div",
            { class: "view" },
            editId !== todo.id &&
            jsx("input", {
              ...(todo.done ? { class: "toggle whithsvg" } : { class: "toggle withoutsvg" }),
              // class: "toggle",
              type: "checkbox",
              // type: "checkbox",
              "data-testid": "todo-item-toggle",
              ...(todo.done ? { checked: true } : {}),
              // checked: todo.done,
              onclick: () => {
                AddToCommple(todo.id, todos, setTodos);
              },
            }),
            jsx(
              "label",
              {
                "data-testid": "todo-item-label",
                ondblclick: () => {
                  editId = todo.id;
                  render();
                },
                contenteditable: editId === todo.id,
                onkeydown: (e) => {
                  if (e.code === "Enter")
                    // saveEdit(e.target.textContent, todo.id);
                    saveEdit(e.target.textContent, todo.id, todos, setTodos);
                },
                onblur: () => {
                  editId = undefined;
                  render();
                },
                ref: (el) => {
                  if (editId === todo.id) el.focus();
                },
              },
              todo.text
            ),
            editId !== todo.id &&
            jsx("button", {
              class: "destroy",
              "data-testid": "todo-item-button",
              onclick: () => RemoveToList(todo.id, todos, setTodos),
            })
          )
        )
      )
    )
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all")

  todoList = todos;
  // const hash = window.location.hash;
  // setFilter(
  //   hash === "#/active"
  //     ? "active"
  //     : hash === "#/completed"
  //       ? "completed"
  //       : "all")
  return jsx(
    "div",
    null,
    jsx(
      "section",
      { class: "todoapp", id: "root" },
      jsx(Header, { todos, setTodos }),
      jsx(MainSection, { todos, setTodos, filter }),
      todos.length > 0 && jsx(Footer, { filter, setFilter, todos, setTodos })
    ),
    jsx(FooterInfo)
  );
}

rout.addrout("/", App);
rout.handleRouteChange();