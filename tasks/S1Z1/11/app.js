const math = require('./math');
const fs = require('fs');

const a = (process.argv[2]) 
  ? parseInt(fs.readFileSync(process.argv[2])) 
  : console.log(`Wynik działania aplikacji: ${'\n'}> zbyt mało parametrów!`);

if (!a){return}; //if variable "a" was not created, program  stops

const b = (process.argv[3]) 
  ? parseInt(fs.readFileSync(process.argv[3])) 
  : console.log(`Wynik działania aplikacji: ${'\n'}> zbyt mało parametrów!`);

if (!b){return}; //if variable "b" was not created, program  stops

if (process.argv[4]){
  console.log(`Wynik działania aplikacji: ${'\n'}> zbyt dużo parametrów!`);
  return;}


const resultAdd = math.add(a, b);
const resultSub = math.sub(a, b);
const resultMul = math.mul(a, b);
const resultDiv = math.div(a, b);

// debugging
// console.log('add ' +resultAdd);
// console.log('sub ' +resultSub);
// console.log('mul ' +resultMul);
// console.log('div ' +resultDiv);


fs.writeFileSync('wynik.txt', resultAdd + '\n');
fs.appendFileSync('wynik.txt', resultSub + '\n');
fs.appendFileSync('wynik.txt', resultMul + '\n');
fs.appendFileSync('wynik.txt', resultDiv + '\n');