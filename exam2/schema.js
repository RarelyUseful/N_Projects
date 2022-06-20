const mongoose = require("mongoose");

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

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
const TaskModel = mongoose.model("posts", PostingFrame); // pierwszy parametr to nazwa kolekcji w bazie danych

const newTask = new TaskModel({
  title: "Zmarła Amelia Goldman",
  description: "Sprzedam Opla",
  author: "Andrzej",
  category: "Ogłoszenia",
  tags: ["Stypa", "Nekrologi", "Ogłoszenia"],
  price: 0,
  disabilities: "za ile?",
});
module.exports = {
  TaskModel,
};
