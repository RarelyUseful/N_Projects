const fs = require("fs");

function readNotes() {
  fs.readFile("./userNotes.txt", (err, data) => {
    if (err) {
      console.log("Error when reading the file");
    }
    console.log("Things on your To-Do list:");
    console.log(data.toString());
  });
}

module.exports = {
  readNotes: readNotes,
};
