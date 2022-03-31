const express = require("express");

const app = express();
app.disable("x-powered-by");

app.get("/:task/:a/:b", (req, res) => {
  const task = req.params.task;
  const a = req.params.a;
  const b = req.params.b;
  if (isNaN(a) || isNaN(b)) {
    res.status = 400;
    res.send("Bad parameters");
  } else if (task == "mnozenie") {
    res.send(`Inputs: ${a}, ${b}, mul result: ${Number(a) * Number(b)}`);
  } else if (task == "dzielenie") {
    if (b == 0) {
      res.send("Can't divide by 0, boy.");
    } else {
      res.send(`Inputs: ${a}, ${b}, div result: ${Number(a) / Number(b)}`);
    }
  } else if (task == "dodawanie") {
    res.send(`Inputs: ${a}, ${b}, sum result: ${Number(a) + Number(b)}`);
  } else if (task == "odejmowanie") {
    res.send(`Inputs: ${a}, ${b}, sub result: ${Number(a) - Number(b)}`);
  } else {
    res.send(`Yeah, well... that's just like ... bad request, man.`);
  }
});

app.listen(4700, () => console.log("server started"));
