const fs = require("fs");
const yargs = require("yargs");
const parameters = yargs.argv;

const user = {
  name: parameters.name,
  lastName: parameters.lastName,
};

function callbackFirst(error) {
  if (error) {
    console.log("zapis do pliku się nie udał");
  } else {
    console.log("zapis do pliku się udał");
  }
  console.log("Aplikacja zakończona.");
}

fs.writeFile("user.json", JSON.stringify(user), callbackFirst);

// node app.js --name=Adam --lastName=Mickiewicz
