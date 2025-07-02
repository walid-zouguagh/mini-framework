import { EventListener } from "../../core/events.js";
import { createHTML, root } from "../../core/dom.js";
import { Router } from "../../core/router.js";
import { UpdateDOM } from "../../core/Vdom/diffing.js";
import { useState } from "../../core/state.js";

const rout = new Router();

rout.addrout("/", HomeHandler);
rout.addrout("/about", () => console.log("hello this is the about page"));

function HomeHandler(req, res) {
  navbar();
}

function navbar() {
  const navbar = createHTML(
    "nav",
    { className: "nav", id: "navb" },
    createHTML(
      "p",
      {
        className: "logo",
        onclick: () => {
          let name = "walid";
          console.log("use State----------", useState(name));
        },
      },
      "test"
    ),
    createHTML(
      "ul",
      { className: "links" },
      createHTML("li", {}, createHTML("a", { href: "/" }, "home")),
      createHTML("li", {}, createHTML("a", { href: "/about" }, "about"))
    )
  );
  //   EventListener("#navb", "click", handleclick);
  UpdateDOM(navbar);
}

rout.handleRouteChange();

// function handleclick(e) {
//   console.log(e);
// }
