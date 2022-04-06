const express = require("express");

const router = express.Router();

let users = [
  {
    id: 1,
    name: "Adam",
    username: "adamek",
    email: "adam@adamek.abc",
  },
];

//dodawanie usera
router.post("/add", (req, res) => {
  if (!req.query.name || !req.query.username || !req.query.email) {
    res.status(400).send("Missing parameters");
  }

  let userIds = users.map((e) => e.id);
  let maxUserId = Math.max(...userIds);
  let newUserId = maxUserId + 1;

  const newUser = {
    id: newUserId,
    name: req.query.name,
    username: req.query.username,
    email: req.query.email,
  };

  users.push(newUser);
  res.status = 201;
  res.send("user created");
});
//wyswietl wszystkich
router.get("/", (req, res) => {
  res.json(users);
});
//wyswietl jednego
router.get("/:userId", (req, res) => {
  const user = users.filter((u) => u.id == req.params.userId);

  if (user.length == 0) {
    res.status(404).send("User not found");
  }
  res.format({
    "text/plain": function () {
      res.send(`${user[0].name} ${user[0].username} ${user[0].email}`);
    },

    "text/html": function () {
      res.send(`<html><body><p>${user[0].name} ${user[0].username} ${user[0].email}</p></body></html>`);
    },

    "application/json": function () {
      res.send(user[0]);
    },

    default: function () {
      // log the request and respond with 406
      res.status(406).send("Not Acceptable");
    },
  });
});
//usun uzytkownika z id
router.delete("/:userId", (req, res) => {
  const userExists = users.find((u) => u.id == req.params.userId);

  if (!userExists) {
    res.statusCode = 404;
    res.send("Not found");
  } else {
    users = users.filter((u) => u.id != req.params.id);
    res.statusCode = 204;
    res.send();
  }
});

module.exports = router;
