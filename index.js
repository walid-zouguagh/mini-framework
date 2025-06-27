import { EventListener } from "./core/events.js";

EventListener("#btnClick", "click", () => console.log("Button clicked"));
EventListener("#btnDblClick", "dblclick", () => console.log("Button double-clicked"));
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
EventListener("#hoverBox", "mouseover", () => console.log("Mouse entered box"));
EventListener("#hoverBox", "mouseout", () => console.log("Mouse left box"));
EventListener("#scrollArea", "scroll", () => console.log("Scroll detected"));
