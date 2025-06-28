import { EventListener } from "../../core/events.js";
import { createHTML } from "../../core/dom.js";
import { Router } from "../../core/router.js";

function Count({ start }) {
  const [count, setCount] = useState(start);
  return jsx(
    "div",
    null,
    jsx("button", { onclick: () => setCount(count + 1) }, `count is ${count}`)
  );
}

function App() {
  const [text, setText] = useState("");
  useEffect(() => {
    console.log("hello world");
  }, []);
  return jsx(
    "div",
    null,
    jsx("h1", null, "Simple React by Walid"),
    jsx(Count, { start: 0 }),
    jsx("p", null, text),
    jsx("button", { onclick: () => setText("this is Tach") }, "click Me")
  );
  // return jsx("h1", {className: "new"}, "hello world")
}

render();

const rout = new Router();

rout.addrout("/", test);
rout.addrout("/about", () => console.log("hello this is the about page"));

function test() {
  console.log("hello this is the home page");
}

rout.handleRouteChange();

const element = createHTML(
  "div",
  {
    className: "div",
    id: "1",
    textContent: "hello how are you",
  },
  createHTML(
    "div",
    {
      className: "div",
      id: "2",
      textContent: "ele2",
    },
    createHTML("span", {
      className: "div",
      id: "2",
      textContent: " nested element",
    })
  )
);

document.body.appendChild(element);

function testingEvents() {
  EventListener("#btnClick", "click", () => console.log("Button clicked"));
  EventListener("#btnDblClick", "dblclick", () =>
    console.log("Button double-clicked")
  );
  EventListener("#inputField", "input", () => console.log("Input typed"));
  EventListener("#inputField", "keydown", () => console.log("Key down"));
  EventListener("#inputField", "keypress", () => console.log("Key press"));
  EventListener("#inputField", "keyup", () => console.log("Key up"));
  EventListener("#inputField", "blur", () => console.log("Blurred"));
  EventListener("#inputField", "focus", () => console.log("Focused"));
  EventListener("#testForm", "submit", (e) => {
    e.preventDefault();
    console.log("Form submitted");
  });
  EventListener("#hoverBox", "mouseover", () =>
    console.log("Mouse entered box")
  );
  EventListener("#hoverBox", "mouseout", () => console.log("Mouse left box"));
  EventListener("#scrollArea", "scroll", () => console.log("Scroll detected"));
}
