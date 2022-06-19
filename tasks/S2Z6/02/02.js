const path = require("path");
const express = require("express");
const app = express();
// npm i mustache-express
const mustacheexpress = require("mustache-express");

app.engine("mustache", mustacheexpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "./views"));
app.get("/:name?", (req, res) => {
  const { name = "World" } = req.params;

  const scope = {
    name: name,
    paragraphText: "this is text from paragraph",
    showHidden: true,
    collection: ["A", "B", "X", "Z"],
  };

  res.render("index", scope);
});

app.listen(4700, () => console.log("server started"));
