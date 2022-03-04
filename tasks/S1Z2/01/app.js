//1. Stworzenie aplikacji składającej się z 2 plików `app.js` oraz plików z `utils.js` 
// w którym to zostanie zaimplementowana funkcja która zwraca nową tablicę bez zduplikowanych elementów.

const utils = require('./utils')

const someArray = ['ala', 3, 'ma', 'kota', 2, 'ala', 5, 3];

const funcResult = utils.uniq(someArray);

console.log(funcResult);