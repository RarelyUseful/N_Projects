const yargs = require('yargs')
const args = yargs.argv;
// 'npm init -y'
// 'npm install yargs'

//console.log(args);

let a = args.a;
let b = args.b;
let operator = args.operator;

if ( operator == '+') {
    console.log(a+b);
}
if ( operator == '*') {
    console.log(a*b);
}
if ( operator == '-') {
    console.log(a-b);
}
if ( operator == '/') {
    console.log(a/b);
}