const math = require('./math');

const fs = require('fs');

const a = Number(fs.readFileSync('a.txt'));
const b = Number(fs.readFileSync('b.txt'));

const resultAdd = math.add(a, b);
const resultSub = math.sub(a, b);
const resultMul = math.mul(a, b);
const resultDiv = math.div(a, b);

// debugging
console.log('add ' +resultAdd);
console.log('sub ' +resultSub);
console.log('mul ' +resultMul);
console.log('div ' +resultDiv);


fs.writeFileSync('wynik.txt', resultAdd + '\n');
fs.appendFileSync('wynik.txt', resultSub + '\n');
fs.appendFileSync('wynik.txt', resultMul + '\n');
fs.appendFileSync('wynik.txt', resultDiv + '\n');