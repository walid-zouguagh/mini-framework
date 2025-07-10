# 🪶 Mini Framework

A lightweight, modular JavaScript mini-framework designed for DOM manipulation, client-side routing, event handling, and state management — all powered by a minimal Virtual DOM system.

> ⚡️ Ideal for small projects, educational use, and prototyping.

---

## 🚀 Features

- ✨ Custom Event System
- ⚙️ JSX-like DOM Utility
- 🧠 State Management (`useState`)
- 🗺️ Client-Side Router
- 🔁 Virtual DOM + Diffing
- 📦 Zero Dependencies
- 🎯 Minimal and Hackable

---

## 📂 Project Structure

```
mini-framework/
├── index.html # Demo / App entry
├── index.js # App entry script
├── myworkspace.html # Developer playground
│
├── core/ # Core framework logic
│ ├── dom.js # JSX-style DOM creation
│ ├── events.js # Custom event registry
│ ├── notfound.js # 404 handler
│ ├── render.js # Renderer
│ ├── router.js # Router system
│ ├── state.js # State manager
│ └── Vdom/ # Virtual DOM utilities
│ ├── create.js
│ ├── diffing.js
│ └── render.js
│
├── examples/
│ └── todomvc/ # 📝 TodoMVC App
│ ├── index.html
│ ├── style.css
│ └── app.js
│
├── docs/
│ └── README.md
├── package.json
└── .gitignore
```

---

## 🧩 Core Modules

### 📚 1. Event System (`core/events.js`)

Handles all event binding through a centralized registry.

#### Supported Events:

- `click`, `dblclick`, `input`, `keydown`, `keyup`, `blur`, `focus`, `submit`, `change`, etc.

#### API: `EventListener(target, type, handler)`

Registers an event listener:

```js
import { EventListener } from "../core/events.js";

EventListener(document, "click", (e) => {
  console.log("Clicked:", e.target);
});
```

### 🏗 2. DOM Utilities & JSX (core/dom.js)

Creates real DOM from JSX-like virtual objects.

```js
API: jsx(tag, props, ...children)

const element = jsx("button", { onclick: () => alert("Hi!") }, "Click me");
This enables building reusable components like:

function Header() {
  return jsx("header", { class: "header" },
    jsx("h1", {}, "todos"),
    jsx("input", { class: "new-todo", placeholder: "What needs to be done?" })
  );
}
```

### 🌐 3. Routing (core/router.js)

Simple hash-based SPA routing with dynamic rendering.

API:
Method Description
addrout(path, cb) Register a route callback
navigate(path) Navigate to a route
handleRouteChange() Auto-detect and handle hash change
CurrentPath() Returns the current route path

Example:

```js
rout.addrout("/", () => jsx("h1", {}, "Home"));
rout.addrout("/about", () => jsx("h1", {}, "About Us"));

rout.navigate("/about"); // Navigate programmatically
```

### 🧠 4. State Management (core/state.js)

Inspired by React’s useState.

```js
const [state, setState] = useState(initialValue);
const [count, setCount] = useState(0);

const increment = () => setCount(count + 1);
```

Updating state triggers re-render of affected components.

### 🌱 5. Virtual DOM System

Located under core/Vdom/.

🔧 create.js – Virtual DOM Generator
Converts real DOM into Virtual DOM objects.

```js
const vdom = htmlToObject(document.getElementById("root"));
🧠 diffing.js – DOM Diffing
Efficiently compares two Virtual DOM trees and updates the real DOM.

UpdateDOM(document.getElementById("root"), oldVdom, newVdom);
```

Only changed nodes get updated

Supports keyed updates, attributes, events

🖼 render.js – VDOM to DOM Renderer

```js
const domNode = objectToHTML(vNode);
document.body.appendChild(domNode);
```

✅ TodoMVC Example
The todomvc app is a complete example showing:

🛠 Components:
Header: Input box and label for adding todos

MainSection: List rendering, toggle-all, edit, delete

Footer: Filters (All, Active, Completed), counter, clear completed

FooterInfo: Credits and info

🔁 State Usage

```js
const [todos, setTodos] = useState([]);
const [filter, setFilter] = useState("all");

SetNewTodoList("Buy milk", todos, setTodos);
🧮 Filtering & Logic

function filter_with_hash(hash, todos) {
  if (hash === "#/active") return todos.filter(t => !t.done);
  if (hash === "#/completed") return todos.filter(t => t.done);
  return todos;
}
🧩 Routing in Action

rout.addrout("/", App);                // Default
rout.handleRouteChange();             // Activate
rout.navigate("/#/completed");        // Navigate from UI
🧪 Sample Usage of JSX + EventListener

import { jsx } from "../core/dom.js";
import { EventListener } from "../core/events.js";

const Button = () =>
  jsx("button", { onclick: () => alert("Clicked!") }, "Click Me");

EventListener(document, "keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter key pressed!");
  }
});
```

📜 License
MIT — Open to modification and educational use.

Made with 🧠 and ✨ by the Mini Framework Team

---

You can copy this directly into a `README.md` file inside your `docs/` or root directory. Let me know if you'd like help turning it into a downloadable `.md` file or converting it for GitHub Pages.
