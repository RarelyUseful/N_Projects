// npm i mongodb
require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.mongoconnectionstring;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const usersCollection = client.db("baseMongo").collection("users");

  const users = await usersCollection.find().toArray();
  // console.log(users);
  // console.table(users);

  // const insertResult = await usersCollection.insertOne({
  //   firstname: "Marek",
  //   lastname: "Jurek",
  //   isactive: true,
  // });
  //const updateResult = await usersCollection.updateMany({}, { $set: { phonenumber: "48" } });

  const count = await usersCollection.countDocuments();
  console.log(count);
  let findthat = await usersCollection.find({ firstname: "adam" }).toArray();
  console.table(users);
  console.table(findthat);
  client.close();
});
// Note: in .env file there can't be ";" at the end, and prettier insist on puting it there.
