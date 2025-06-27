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