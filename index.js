const path = require("path");

const express = require("express");
const app = express();
app.use("/core/", express.static(path.join(__dirname, "/core")));
app.use("/examples/", express.static(path.join(__dirname, "/examples")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./examples/todomvc/index.html"));
});

console.log("http://localhost:3000");

app.listen(3000);
