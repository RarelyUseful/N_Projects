const path = require("path");
const express = require("express");
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
//npm i express
//npm i pug

app.get("/:name?", (req, res) => {
  const { name = "World" } = req.params;
  const scope = {
    name: name,
  };

  res.render("index", scope);
});

app.listen(4700, () => console.log("server started"));
