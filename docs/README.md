# 🪶 Mini Framework

A lightweight, modular JavaScript mini-framework designed for DOM manipulation, custom event handling, routing, and state management — with a minimal Virtual DOM system.

> ⚡️ Designed for small projects, learning purposes, and rapid prototyping.

## 🚀 Features
- Custom Event System
- DOM Utilities
- Client-side Router
- State Management
- Virtual DOM (with diffing)
- Simple and Hackable Design
- No Dependencies
## 📂 Project Structure

mini-framework/
│
├── index.html # Demo / Entry Point
├── index.js # Entry Script
├── myworkspace.html # Developer Playground
│
├── core/ # Core Framework Modules
│ ├── dom.js # DOM Utilities
│ ├── events.js # Custom Event System
│ ├── notfound.js # 404 Handling
│ ├── render.js # Rendering Utilities
│ ├── router.js # Router Module
│ ├── state.js # State Management
│ │
│ └── Vdom/ # Virtual DOM Modules
│ ├── create.js
│ ├── diffing.js
│ └── render.js
│
├── docs/ # Documentation
│ └── README.md
│
├── examples/ # Example Apps
│ └── todomvc/
│ ├── index.html
│ ├── style.css
│ └── app.js
│
├── package.json # Project Metadata
└── .gitignore


---

## 📑 Table of Contents
1. [Introduction](#-mini-framework)
2. [Features](#-features)
3. [Project Structure](#-project-structure)
4. [Core Modules](#core-modules)
    - [Event System](#event-system)
    - [DOM Utilities](#dom-utilities)
    - [Routing](#routing)
    - [State Management](#state-management)
    - [Virtual DOM](#license)

---

## 🧩 Core Modules

### 📚 Event System (`core/events.js`)

#### Overview
The Event System module provides custom event registration and management for DOM elements, using a centralized registry and unique element IDs.

---

#### Supported Events:
- `click`, `dblclick`, `input`, `keydown`, `scroll`,  
  `mouseover`, `mouseout`, `change`, `submit`,  
  `keypress`, `keyup`, `blur`, `focus`

---

#### Functions

---

##### `EventListener(target, eventType, callback)`

Registers an event listener on a target element, `document`, or `window`.

###### Parameters:
| Name       | Type       | Description                                           |
|------------|------------|-------------------------------------------------------|
| `target`   | Element / Document / Window | Target to attach the event to. |
| `eventType`| String     | Type of event (must be in supported list).             |
| `callback` | Function   | Event handler function.                               |

###### Usage:
```js
EventListener(document, "click", (e) => {
  console.log("Document clicked:", e);
});
```

### 📚 DOM Utilities (`core/dom.js`)

#### Overview
This module provides utilities for creating and rendering DOM elements from Virtual DOM-like objects, along with a helper function to simplify element creation (JSX-like).

---

#### Functions

---

##### `createHTML(element, Vdom)`

Creates and appends a DOM structure based on a Virtual DOM object.

###### Parameters:
| Name     | Type       | Description                                                |
|----------|------------|------------------------------------------------------------|
| `element`| Element    | Parent DOM element to append to.                           |
| `Vdom`   | Object / String / Number | Virtual DOM structure or text content.         |

###### Usage:
```js
const root = document.getElementById("root");
createHTML(root, {
  tag: "div",
  attrs: { id: "app", class: "container" },
  children: ["Hello, World!"]
});
```


### 📚 DOM Utilities (`core/dom.js`)

#### Overview
This module provides utilities for creating and rendering DOM elements from Virtual DOM-like objects, along with a helper function to simplify element creation (JSX-like).

---

#### Functions

---

##### `createHTML(element, Vdom)`

Creates and appends a DOM structure based on a Virtual DOM object.

###### Parameters:
| Name     | Type       | Description                                                |
|----------|------------|------------------------------------------------------------|
| `element`| Element    | Parent DOM element to append to.                           |
| `Vdom`   | Object / String / Number | Virtual DOM structure or text content.         |

###### Usage:
```js
const root = document.getElementById("root");
createHTML(root, {
  tag: "div",
  attrs: { id: "app", class: "container" },
  children: ["Hello, World!"]
});
```

### 📚 Routing (`core/router.js`)

#### Overview
This module provides a simple client-side router for single-page applications (SPA), with automatic Virtual DOM updates on route changes.

---

#### Class: `Router`

Handles the routing mechanism.

---

##### Methods:

| Method               | Description                                                   |
|----------------------|---------------------------------------------------------------|
| `addrout(path, callback)` | Registers a route with a callback returning Virtual DOM. |
| `handleRouteChange()`     | Handles the route change and updates the DOM.             |
| `navigate(path)`          | Navigates to a new route and updates the view.            |
| `CurrentPath()`           | Returns the current route path.                           |

###### Example:
```js
import { rout } from "./core/router.js";
import { jsx } from "./core/dom.js";

rout.addrout("/", () => jsx("h1", {}, "Home Page"));
rout.addrout("/about", () => jsx("h1", {}, "About Page"));

rout.navigate("/"); // Navigate to home
```
---

### 📚 State Management (`core/state.js`)

#### Overview
This module provides minimal state management and side-effect hooks, inspired by React's `useState` and `useEffect`.  
It also includes a helper for creating Virtual DOM-like elements (`jsx`).

---

#### Functions

---

##### `useState(initialValue)`

Creates a stateful value and a function to update it, triggering a re-render.

###### Parameters:
| Name          | Type     | Description                          |
|---------------|----------|--------------------------------------|
| `initialValue`| Any      | Initial state value.                 |

###### Returns:
`[state, setState]`  
An array containing:
- `state`: Current value.
- `setState(newValue)`: Function to update the state and re-render.

###### Example:
```js
const [count, setCount] = useState(0);
setCount(count + 1);
consol.log(count) // output 1
```


### 📚 Virtual DOM (`core/Vdom/`)

#### Overview
This module provides a minimal Virtual DOM system that allows you to:
- Represent the DOM as plain JavaScript objects.
- Convert real DOM trees to Virtual DOM objects for easier diffing or serialization.
- Prepare DOM structures for future updates and reconciliation.

---

#### 📄 `create.js` - Virtual DOM Node Creation

##### Overview
This file contains the `htmlToObject` function, which converts a real DOM element into a Virtual DOM-like object (plain JavaScript object representation).

---

##### Function: `htmlToObject(element)`

###### Description:
Recursively traverses a real DOM tree and generates an equivalent Virtual DOM structure as a plain JavaScript object.

###### Parameters:
| Name     | Type   | Description                                  |
|----------|--------|----------------------------------------------|
| `element`| Node   | DOM node to convert into a Virtual DOM object. |

###### Returns:
- A Virtual DOM object with:
  - `tag`: Tag name for elements.
  - `attrs`: Object containing element attributes.
  - `children`: Array of child Virtual DOM nodes (if any).
  - For text nodes: `{ type: "text", content: "..." }`
- Returns `null` for empty text nodes.

###### Example:
```js
const vdom = htmlToObject(document.getElementById("root"));
console.log(vdom);

Output Example:

{
  tag: "div",
  attrs: { id: "root", class: "container" },
  children: [
    {
      type: "text",
      content: "Hello, World!"
    }
  ]
}
```
#### 📄 `diffing.js` - Diffing & Reconciliation

##### Overview
This file contains the Virtual DOM diffing logic, which compares old and new Virtual DOM trees and updates the real DOM efficiently by minimizing changes.

---

##### Function: `UpdateDOM(realElement, oldVdom, newVdom)`

###### Description:
Recursively compares the old Virtual DOM (`oldVdom`) with the new Virtual DOM (`newVdom`) and applies minimal updates to the actual DOM (`realElement`).

###### Parameters:
| Name          | Type   | Description                              |
|---------------|--------|------------------------------------------|
| `realElement` | Element| The real DOM element to update.          |
| `oldVdom`     | Object | The previous Virtual DOM object.         |
| `newVdom`     | Object | The new Virtual DOM object to apply.     |

###### Key Features:
- Replaces elements if tags differ.
- Updates element attributes via `updateAttrs`.
- Diffing and updating children via `updateChildren`.
- Supports keyed elements for optimized child reordering.

###### Example:
```js
UpdateDOM(document.getElementById("root"), oldVdom, newVdom);
```
```md
Internal Function: updateChildren(element, oldChildren, newChildren)
Description:

Handles updates for child nodes:

    Supports text nodes and keyed elements.

    Moves, updates, or removes child nodes as needed.

    Ensures minimal DOM operations.

Internal Function: updateAttrs(oldNode, newNode, realElement)
Description:

Updates attributes and event listeners on the given element.
Behavior:

    Sets new attributes and updates event listeners (onClick, etc.).

    Removes attributes no longer present in the new Virtual DOM.

Notes:

    Supports keyed children (via key attribute) for better performance.

    Handles text nodes and element nodes differently.

    Efficient for small to medium apps, but not fully optimized for very large trees.
    
```

---

#### 📄 `render.js` - DOM Rendering

##### Overview
This file contains the rendering utility for the Virtual DOM system, which converts a Virtual DOM object back into real DOM nodes.

---

##### Function: `objectToHTML(vNode)`

###### Description:
Recursively converts a Virtual DOM object (`vNode`) into a real DOM node:
- Supports both text nodes and element nodes.
- Uses the `createHTML` utility to construct elements and append children.

###### Parameters:
| Name   | Type   | Description                          |
|--------|--------|--------------------------------------|
| `vNode`| Object | Virtual DOM object to render.         |

###### Returns:
- A real DOM node that can be inserted into the document.

###### Example:
```js
const domNode = objectToHTML(vdom);
document.getElementById("root").appendChild(domNode);
```
