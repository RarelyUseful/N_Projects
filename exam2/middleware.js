const { getPost } = require("./dbsetup");

// Task 10. I know it's kind of stupid and this is probably something configurable in database permissions.
const users = ["Admin", "Chuck Norris", "Queen of England"];
let currentUser = users[0];

const userCheckMiddleware = (req, res, next) => {
  const url = req.url;
  const [empty, id] = url.split("/posts/");
  const post = getPost(id);
  console.log(post);
  postAuthor = post.Author;
  if (postAuthor == currentUser) {
    console.log("User authentication: OK");
    next();
  } else if (!!!post._id) {
    console.log("Post doesn't exist, skipping user authentication.");
    next();
  } else {
    console.log("401, Unauthorized.");
    res.status(401);
    res.send("user not permitted");
  }
};

function isVerifiedToken(token) {
  return token === process.env.TOKEN;
}
const authMiddleware = (req, res, next) => {
  const token = req.get("authorization");
  if (isVerifiedToken(token)) {
    console.log("Token: valid");
    next();
  } else {
    console.log("401, Unauthorized.");
    res.status(401);
    res.send("bad token");
  }
};

module.exports = {
  userCheckMiddleware,
  authMiddleware,
};
