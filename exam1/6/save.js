const fs = require("fs");

function addNote(string) {
  fs.appendFile("./userNotes.txt", string + "\n", (err) => {
    if (err) {
      console.log("Error when writing to file.");
    }
    console.log("The note has been saved to file!");
  });
}

function clearNotes() {
  fs.writeFile("./userNotes.txt", "", (err) => {
    if (err) {
      console.log("Error when writing to file.");
    }
    console.log("The list has been cleared.");
  });
}

module.exports = {
  addNote: addNote,
  clearNotes: clearNotes,
};
