const express = require("express");
require("dotenv").config();
const app = express();
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.MONGODB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  app.get("/tasks", async (req, res) => {
    const taskCollection = client.db(process.env.MONGODB_DBNAME).collection("tasks");
    const tasks = await taskCollection.find().toArray();
    res.send(tasks);
  });
});
// endpoint /heartbeat który zwróci aktualną datę i czas
app.get("/heartbeat", (req, res) => {
  res.send(new Date());
});
app.listen(process.env.PORT, () => console.log("server started"));
