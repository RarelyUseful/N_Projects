const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
const { resourceLimits } = require("worker_threads");

const url = process.env.MONGODB_CONNECTION;

const TaskCollectionName = "posts";

let db;
let postsCollection;

const init = () =>
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((client) => {
      db = client.db(process.env.MONGODB_DBNAME);
      postsCollection = db.collection(TaskCollectionName);
    })
    .catch((error) => console.log(error));

const getPosts = () => {
  return postsCollection.find().toArray();
};

const getPost = (sid) => {
  return postsCollection.findOne({ _id: new ObjectId(sid) });
};

const deletePost = (sid) => {
  return postsCollection.deleteOne({ _id: new ObjectId(sid) });
};

const addPost = (newPost) => {
  newPost.createdTime = new Date();
  return postsCollection.insertOne(newPost);
};

// looks like this can only update hard-coded keys, can't do (...), { $set { thiskey: thisvalue } });
const updatePost = (sid, key, value) => {
  return postsCollection.updateOne({ _id: new ObjectId(sid) }, { $set: { [key]: value } });
};

const replacePost = (sid, value) => {
  // not sure how to use this either, looks like i can't just shove full object.
  return postsCollection.replaceOne({ _id: new ObjectId(sid) }, { value }, { upsert: false });
};
const searchPosts = (req) => {
  const title = req.query.title || "";
  const description = req.query.description || "";
  const price_min = Number(req.query.price_min) || 0;
  const price_max = Number(req.query.price_max) || Infinity;
  const posted_since = new Date(req.query.posted_since) || new Date("1950-01-01");
  const posted_before = new Date(req.query.posted_before) || new Date("2077-01-01");
  //   const tags = req.query.tags || ",";
  //   const tag = tags.trim().split(",");
  //   console.log(tag);
  return postsCollection
    .find({
      title: { $regex: title },
      description: { $regex: description },
      price: { $gte: price_min, $lte: price_max },
      //postedDate: { $gte: posted_since, $lte: posted_before },
      // tags: { $all: tag },
      //   tags: tag,
    })
    .toArray();
};

//empty tag screws search results, so i moved it to separate url
const searchTags = (req) => {
  const tagsString = req.query.tags || "";
  const tagsArr = tagsString.replace(/ /g, "").split(",");
  return postsCollection.find({ tags: { $all: tagsArr } }).toArray();
};

module.exports = {
  init,
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
  replacePost,
  searchPosts,
  searchTags,
};
