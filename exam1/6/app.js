const readMod = require("./read");
const saveMod = require("./save");
const yargs = require("yargs");
//const { string } = require("yargs");

yargs(process.argv.slice(2))
  .command({
    command: "add <note>",
    aliases: ["note", "new"],
    desc: "Add one new note to the list. \n Use quotes if note is longer than one word.",
    usage: "Usage: $0 add string",
    type: "string",
    nargs: 1,
    handler: (argv) => {
      saveMod.addNote(argv.note);
    },
  })
  .command({
    command: "read",
    aliases: ["show", "view"],
    desc: "View all the notes saved in To-Do list.",
    handler: (argv) => {
      readMod.readNotes();
    },
  })
  .command({
    command: "clear",
    aliases: ["reset"],
    desc: "Delete all the notes saved in To-Do list.",
    handler: (argv) => {
      saveMod.clearNotes();
    },
  })
  .command("$0", "Display welcome screen", (argv) => {
    console.log(`*** Welcome in your To-Do list.*** \nPlease use command:`);
    console.log(` <add | new | note> "note_text_here" - to add new note to file. \n -> Example: add "my 1st note"`);
    console.log(` <read | show | view> - to display all notes in your list.`);
    console.log(` <clear | reset> - to delete all notes in your list.`);
  })
  .strict()
  .locale("en")
  .help();

yargs.parse(); // To set above changes

/* 
To run:
node app.js
node app.js -m "Multiple words input"

*/
