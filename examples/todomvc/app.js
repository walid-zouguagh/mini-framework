// ✅ FIXED VERSION OF YOUR ORIGINAL APP BASED ON THE REFERENCE CODE

import { jsx } from "../../core/dom.js";
import { render } from "../../core/render.js";
import { rout } from "../../core/router.js";
import { useState } from "../../core/state.js";

let todoList = [];
let editId;

function filter_with_hash(hash) {
  if (hash === "/" || hash === "#/") {
    return todoList;
  } else if (hash === "#/active") {
    return todoList.filter((todo) => !todo.done);
  } else if (hash === "#/completed") {
    return todoList.filter((todo) => todo.done);
  } else {
    return todoList;
  }
}

function lengthTodo() {
  return todoList.filter((todo) => !todo.done).length;
}

function TodoActive() {
  return todoList.some((todo) => !todo.done);
}

function UpdateAll() {
  let done = TodoActive();
  todoList = todoList.map((todo) => ({
    text: todo.text,
    id: todo.id,
    done,
  }));
  render();
}

const saveEdit = (newText, id) => {
  if (newText.trim().length <= 1) return;
  todoList = todoList.map((todo) =>
    todo.id === id ? { ...todo, text: newText } : todo
  );
  editId = undefined;
  render();
};

const SetNewTodoList = (text, done = false, id = new Date()) => {
  todoList.push({ text, done, id: id.getTime() });
  render();
};

const RemoveToList = (id) => {
  console.log("hani hna");
  console.log("id", id);
  console.log(todoList);

  todoList = todoList.filter((todo) => todo.id !== id);
  console.log("after", todoList);

  render();
};

function clearCompleted() {
  todoList = todoList.filter((todo) => !todo.done);
  render();
}

const AddToCommple = (id) => {
  todoList = todoList.map((todo) =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  );
  render();
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

function Header() {
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
            SetNewTodoList(e.target.value.trim(), false);
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

function Footer({ filter = "all" }) {
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
            href: "#/active",
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
            href: "#/completed",
          },
          "Completed"
        )
      )
    ),
    jsx(
      "button",
      { class: "clear-completed", onclick: clearCompleted },
      "Clear completed"
    )
  );
}

function MainSection() {
  // console.log(currentList, "good");
  // console.log(window.location.hash);
  let show_toList = filter_with_hash(window.location.hash);
  return jsx(
    "main",
    { class: "main", "data-testid": "main" },
    jsx(
      "div",
      { class: "toggle-all-container" },
      todoList.length > 0 &&
        jsx("input", {
          class: "toggle-all",
          type: "checkbox",
          id: "toggle-all",
          "data-testid": "toggle-all",
          onclick: UpdateAll,
        }),
      todoList.length > 0 &&
        jsx(
          "label",
          {
            class: "toggle-all-label",
            for: "toggle-all",
            onclick: UpdateAll,
          },
          "Toggle All Input"
        )
    ),
    todoList.length > 0 &&
      jsx(
        "ul",
        { class: "todo-list", "data-testid": "todo-list" },
        ...show_toList.map((todo) =>
          jsx(
            "li",
            {
              class: todo.done ? "completed" : "",
              "data-testid": "todo-item",
              "data-id": todo.id, //for testing
            },
            jsx(
              "div",
              { class: "view" },
              editId !== todo.id &&
                jsx("input", {
                  class: "toggle",
                  type: todo.done ? "checkbox" : "",
                  // type: "checkbox",
                  "data-testid": "todo-item-toggle",
                  checked: todo.done,
                  onclick: () => {
                    AddToCommple(todo.id);
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
                      saveEdit(e.target.textContent, todo.id);
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
                  onclick: () => RemoveToList(todo.id),
                })
            )
          )
        )
      )
  );
}

function App() {
  return jsx(
    "div",
    null,
    jsx(
      "section",
      { class: "todoapp", id: "root" },
      jsx(Header),
      jsx(MainSection),
      todoList.length > 0 && jsx(Footer, { filter: "all" })
    ),
    jsx(FooterInfo)
  );
}

rout.addrout("/", App);
rout.handleRouteChange();
