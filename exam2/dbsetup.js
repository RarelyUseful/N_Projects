const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

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
const updatePost = (sid, newVal) => {
  return postsCollection.updateOne({ _id: new ObjectId(sid) }, { $set: { isAvailable: newVal } });
};

const replacePost = (sid, value) => {
  // not sure how to use this either, looks like i can't just shove full object.
  return postsCollection.replaceOne({ _id: new ObjectId(sid) }, { value }, { upsert: false });
};

module.exports = {
  init,
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
  replacePost,
};
