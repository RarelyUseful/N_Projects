const math = require('./math');

const fs = require('fs');

const a = parseInt(fs.readFileSync(process.argv[2], (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data;
  }));
const b = parseInt(fs.readFileSync(process.argv[3], (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    return data;
  }));

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