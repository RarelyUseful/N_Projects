// npm i dotenv
// npm i mongoose
// gdy korzystamy z mongoose nie ma potrzeby instalowania mongo
require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_CONNECTION;

// definicja schematu kolecji bazodanowej
const PostingFrame = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: String, // ? maybe i can force it to be one of pre-Defined Users ?
    category: String,
    tags: Array, // syntax ?
    price: Number,
    isAvailable: {
      type: Boolean,
      default: true,
    },
    postedDate: {
      type: Date,
      default: new Date(), // wartość domyślna
    },
    disabilities: String,
  },
  { timestamps: true } // automatyczne dodawanie włąściwości z czasem utworzenia i modyfikacji dokumentu w bazie
);

// middleware/hook wykonywany przed zapisam dokumentu
PostingFrame.pre("save", function () {
  console.log("task is going to be saved");
});

// middleware/hook wykonywany po zapisie dokumentu
PostingFrame.post("save", function () {
  console.log("task saved");
});

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
const TaskModel = mongoose.model("posts", PostingFrame); // pierwszy parametr to nazwa kolekcji w bazie danych

async function main() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const newTask = new TaskModel({
    title: "Zmarła Amelia Goldman",
    description: "Sprzedam Opla",
    author: "Andrzej",
    category: "Ogłoszenia",
    tags: ["Stypa", "Nekrologi", "Ogłoszenia"],
    price: 0,
    disabilities: "za ile?",
  });

  let result = await newTask.save(); // zapis do bazy nowego dokumentu
  console.log(result);

  const tasks = await TaskModel.find(); // pobranie wszystkich dokumentów z kolekcji
  tasks.forEach((task) => {
    console.table(task);
  });

  //await TaskModel.deleteMany({ available: "false" }); // usunięcie z bazy wszystkich zakończonych ogłoszeń
}

main().catch((err) => console.log(err));
