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

//--------------this is my code
function Count({start}) {
    const [count, setCount] = useState(start)
    return jsx(
        "div", 
        null,
        jsx("button", {onclick:()=>setCount(count+1) }, `count is ${count}`)
    );
}

function App(){
    const [text, setText] = useState("");
    useEffect(() => {
        console.log("hello world");
        
    }, []);
    return jsx(
        "div", 
        null,
        jsx("h1", null, "Simple React by Walid"),
        jsx(Count,{start:0}),
        jsx("p", null, text),
        jsx("button", {onclick: ()=>setText("this is Tach")}, "click Me")
    );
    // return jsx("h1", {className: "new"}, "hello world")
}

render();