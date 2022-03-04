const fs = require('fs');
const yargs = require('yargs');
const args = yargs.argv;

let name = args.name;
let lastName = args.lastName;


let result = JSON.stringify(name +" "+ lastName);

fs.writeFileSync('user.json', result);

/* alt ver:

const user = {
    name: args.name,
    lastName: args.lastName,
}
fs.writeFileSync(JSON.stringify(user));}