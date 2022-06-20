const { getPost } = require("./dbsetup");

// Task 10. I'm not sure what to do, this is probably something configurable in database permissions anyway.
const users = ["Admin", "Chuck Norris", "Queen of England"]; //maybe hide them in .env file?
let currentUser = users[0];

const userCheckMiddleware = async (req, res, next) => {
  const url = req.url;
  const [empty, id] = url.split("/posts/");
  let post = await getPost(id);
  postAuthor = post.author;
  console.log(postAuthor);
  if (postAuthor === currentUser) {
    console.log("User authentication: OK");
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
  currentUser,
};
