const MongoClient = require("mongodb").MongoClient;

let taskCollection;

const init = () =>
  MongoClient.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      const db = client.db(process.env.MONGODB_DBNAME);
      taskCollection = db.collection("tasks");
    })
    .catch((error) => console.log(error));

const getTasks = () => {
  return taskCollection.find().toArray();
};

const getTask = (id) => {};
const deleteTask = (id) => {};
const updateTask = (data, id) => {};
const addTask = (newTask) => {
  return taskCollection.insertOne(newTask);
};

module.exports = {
  init,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
  addTask,
};
