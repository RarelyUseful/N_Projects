//npm i mongoose

const mongoose = require("mongoose");

const uri = "mongodb+srv://pawel:pawelpawel@cluster0.pc5z0.mongodb.net/dbtest?retryWrites=true&w=majority";

const TaskSchema = new mongoose.Schema({
  task: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  value: Number,
});

const TaskModel = mongoose.model("mongoosetask1", TaskSchema);

async function main() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  let newTask = new TaskModel({
    task: "my new task",
    description: "my desc to task",
    value: 20,
  });

  let result = await newTask.save();
  console.log(result);
}

main().catch((err) => console.log(err));
