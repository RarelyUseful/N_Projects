const colors = require("colors");
//const argv = require("yargs").argv;
const argv = require("yargs/yargs")(process.argv.slice(2))
  .usage("Usage: $0 -m [message]")
  .demandOption(["m"])
  .locale("en").argv;

let message = argv.m;
if (message.length > 0) {
  console.log(colors.rainbow(message.toString()));
} else {
  console.log(`Message has nothing in it, i can't show you any colours. :(`);
}

/* 
To run:
node app.js -m OneWordInput
node app.js -m "Multiple words input"

*/
