import { createHTML } from "../../core/dom.js";
import { Router } from "../../core/router.js";

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
    createHTML("div", {
        className: "div",
        id: "2",
        textContent: "ele2",
    }, createHTML("span", {
        className: "div",
        id: "2",
        textContent: " nested element",
    }))
);

document.body.appendChild(element);