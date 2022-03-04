const fs = require('fs');
const Path = require('path')
const yargs = require('yargs');
const args = yargs.argv;

let name = args.name;
let lastName = args.lastName;


let result = JSON.stringify(name +" "+ lastName);

const path = Path.join(__dirname, 'user.json')

// if (fs.existsSync(path)){
//     console.log(JSON.parse(fs.readFileSync('user.json')).name);
//     fs.writeFileSync('user.json', result)}
// else {fs.writeFileSync('user.json', result)};

// node app.js --name=Adam --lastName=Mickiewicz


let primU = fs.readFileSync(user.json')
let namT = (JSON.parse(primU)).name;
console.log(namT);