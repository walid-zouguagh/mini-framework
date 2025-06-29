export default function render(){
    stateIndex = 0;
    effectIndex = 0;
    const root = document.getElementById("root");
    root.innerHTML = "";
    const app = App();
    root.appendChild(createElement(app));
}