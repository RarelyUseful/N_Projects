const express = require("express");

const app = express();
app.disable("x-powered-by");

app.get("/:a/:b", (req, res) => {
  const a = req.params.a;
  const b = req.params.b;
  res.send(`Multiplication result: ${a * b}`);
});

app.listen(4700, () => console.log("server started"));
