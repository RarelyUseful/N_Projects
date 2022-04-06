const express = require("express");

const router = express.Router();

let posts = [
  {
    id: 1,
    title: "Ala ma kota",
    body: "a kot ma Ale",
  },
];

// POSTY:

router.post("/add", (req, res) => {
  // pobranie obiektu z ciała żądania
  const datafromBody = req.body;
  if (!datafromBody.title || !datafromBody.body) {
    res.status(400).send("Missing parameters");
  }

  let postIds = posts.map((u) => u.id);
  let maxPostId = Math.max(...postIds);
  let newPostId = maxPostId + 1;

  const newPost = {
    id: newPostId,
    title: datafromBody.title,
    body: datafromBody.body,
  };

  posts.push(newPost);
  res.statusCode = 201;
  res.send(posts);
});

// http://localhost:4700/posts/
router.get("/", (req, res) => {
  // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
  res.json(posts);
});

// http://localhost:4700/posts/0
router.get("/:id", (req, res) => {
  const post = posts.filter((u) => u.id == req.params.id);

  if (post.length == 0) {
    res.status(404).send("Post not found");
  }

  // zwracając wartość za pomocą res.json() express sam przetworzy obiekt na JSON i ustawi odpowiedni content-type
  res.json(post[0]);
});

// http://localhost:4700/posts/delete/0
router.delete("/delete/:id", (req, res) => {
  const postExists = posts.find((u) => u.id == req.params.id);

  if (!postExists) {
    res.statusCode = 404;
    res.send("Not found");
  } else {
    posts = posts.filter((u) => u.id != req.params.id);
    res.statusCode = 204;
    res.send();
  }
});

module.exports = router;
