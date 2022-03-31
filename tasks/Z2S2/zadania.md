# Node.js - Laboratorium 2

## `Express` (https://expressjs.com/)

Web framework pozwalający w łatwy i szybki sposób postawić serwer HTTP w środowisku NodeJS.

### Pierwsze kroki

1. `npm install express`
2. zaimportowanie modułu do aplikacji i odpowiednie użycie:
```javascript
const express = require('express');

const app = express(); // tworzymy nową instancję serwera

// dodajemy regułę do naszego serwera
// jeżeli użytkownik wejdzie na nasz web serwer
app.get('/', (req, res) => {
    // wysyłamy do klienta dane
    res.send('hello world!');
});

app.listen(4700); // uruchamiamy nasz web serwer na porcie 4500
```

## `express.Router` (https://expressjs.com/en/4x/api.html#router)

```javascript
const express = require('express');
const app = express();
const router  = express.Router(); 

router.use((req, res, next) => {
    // ...
    next();
});

router.get('/', (req, res) => {
    // ...
    res.send('hello world!');
});

app.use(router);

app.listen(4700);
```

## Parsowanie ciała zapytania

https://expressjs.com/en/api.html#express.json

https://expressjs.com/en/api.html#express.urlencoded

```javascript
const express = require('express');
const app = express();

app.use(express.json())

app.post('/', (req, res) => {
    const name = req.body.name;
    // ...
    res.send(`hello ${name}!`);
});

app.listen(4700);
```

## `RegEX` (wyrażenia regularne)

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


```javascript
// tworzenie nowego obiektu regex
let regex = /pattern/flags;
/// lub
regex = new RegExp("pattern", ["flags"]);
const sample = 'this is sample text with number 2 inside';

// sprawdzenie czy dany wzorzec został znaleziony
let testResult = regex.test(sample);
console.log(testResult);

// pobranie wszystkich dopasowań wzorca
let matches = sample.match(regex);
console.log([...matches]);

// zmiana wzorca na podany tekst
let replacedText = sample.replace(regex, 'nowy string');
console.log(replacedText);
```

## Przydatne linki

Dokumentacja `Express`: https://expressjs.com/en/4x/api.html 

Wyrażenia regularne (Regular Expressions, RegEx):
- ściągawka: https://cheatography.com/davechild/cheat-sheets/regular-expressions/
- narzędzie do testowania #1: https://regexr.com
- narzędzie do testowania #2: https://regex101.com
- narzędzie do testowania #3: https://ihateregex.io/expr/username

## Zadania do wykonania na laboratorium

1. W podanym tekście:
``` javascript
const sample = 'this is sample text with  number inside, some postcode 12-123 and phone  number 501-502-503';
```
    - sprawdź czy występuje poprawny kod pocztowy
    - sprawdź czy występuje poprawny numer telefonu
    - wypisz wszystkie grupy w których 3 cyfry występują obok siebie
    - zastąp podwójne spacje pojedyńczymi

2. Przykładowa aplikacja, gdy w adresie pojawi się parametr `name`, wita naszego użytkownika po nazwie. (http://localhost:4700/?name=Jan)
Zmodyfikujmy ten kod tak aby był wykorzystywany framework `Express` i dodatkowo parametr pobierajmy z URL e nie z query stringa (http://localhost:4700/Anna)

3. Stwórzmy aplikację która pobierając 2 parametry `a` i `b` z adresu url (http://localhost:4700/2/3) wykona mnożenie w naszej aplikacji. Rezultat działania powinniśmy wysłać do użytkownika końcowego(klienta). 

4. Rozszerzmy naszą aplikację z zadania 3 o dodatkowe działania matematyczne takie jak mnożenie, dzielenie i odejmowanie. Podzielmy zadania na odpowiednie ścieżki.

```bash
// http://localhost:4700/mnozenie/4/5
// http://localhost:4700/dzielenie/4/5
// http://localhost:4700/dodawanie/4/5
// http://localhost:4700/odejmowanie/4/5
```
5. Stwórzmy aplikację której zadaniem będzie operacja na tablicy zawierającej użytkowników
    - Stworzyć 'końcówkę' `/add` do dodawania użytkownika która przyjmuje parametry `?name=Jan&username=janko&email=jan@nowak.abc`
    - Dodać ścieżkę wyświetlania wszystkich użytkowników oraz jeżeli zostanie podany odpowiedni `id` wyświetlić jedynie jednego użytkownika
    - Rozszerzyć aplikację o kasowanie użytkownika poprzez odpowiednią ścieżkę.

6. Wzorując się na zadaniu 4 stwórzmy analogicznie obsługę tablicy zawierającej posty. Tym razem aby dodać post obsłużymy metodę POST i dane przesyłane w body żadania. Aplikacja ma rozszerzyć naszą już istniejącą aplikację z zadania 5.

Struktura body `POSTu`:
```javascript
{
    title: '',
    body: ''
}
```
7. Podzielmy odpowiednio naszą aplikację z zadania 6 wykorzystując `express.Router` https://expressjs.com/en/4x/api.html#router

8. Zmodyfikujmmy zadanie 7 tak by adres zwracający dane pojedynczego użytkownika zwracał różne format danych w zależności od nagłówka żądania Accept (przykładowe nagłówki: text/plain, text/html, application/json). Należy użyć funkcji res.format().