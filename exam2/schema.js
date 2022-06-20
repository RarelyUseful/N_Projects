const mongoose = require("mongoose");
const { currentUser } = require("./middleware");

// definicja schematu kolecji bazodanowej
const PostingFrame = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    category: { type: String, required: true },
    tags: Array, // syntax ?
    price: { type: Number, required: true },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    postedDate: {
      type: Date,
      default: new Date(), // wartość domyślna
    },
    author: { type: String, default: currentUser }, // maybe i can force it to be one of pre-Defined Users ?
  },
  { timestamps: true } // automatyczne dodawanie włąściwości z czasem utworzenia i modyfikacji dokumentu w bazie
);

// tworzenie modelu danych dla konkretnej kolekcji na podstawie uprzednio stworzonego schematu
// const PostModel = mongoose.model("posts", PostingFrame); // pierwszy parametr to nazwa kolekcji w bazie danych

module.exports = {
  //PostModel,
  PostingFrame,
};
