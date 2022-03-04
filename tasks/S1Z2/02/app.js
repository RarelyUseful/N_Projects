//1. Stworzenie aplikacji składającej się z 2 plików `app.js` oraz plików z `utils.js` 
// w którym to zostanie zaimplementowana funkcja która zwraca nową tablicę bez zduplikowanych elementów.

const utils = require('./utils')

const tabA = ['ala', 'ma', 'kota'];
const tabB = ['ala', 'ma', 'psa'];

console.log(utils.diff(tabA, tabB));
console.log(utils.diff(tabB, tabA));

