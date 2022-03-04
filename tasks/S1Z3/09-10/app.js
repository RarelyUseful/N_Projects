const userMd = require("./user");
const argv = require("yargs").argv;
const userId = argv.id;
const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

userMd.getUser(userUrl);

/* 
Wywołanie
node app.js --id=2
node app.js --id=3
*/
