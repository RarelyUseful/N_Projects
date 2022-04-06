const express = require("express");
const users = require("./users");
const posts = require("./posts");

const app = express();
app.disable("x-powered-by");

// potrzebne do parsowania ciała żądania w formacie JSON
app.use(express.json());

//routing:
app.use("/users", users);
app.use("/posts", posts);

app.listen(4700, () => console.log("server started"));
