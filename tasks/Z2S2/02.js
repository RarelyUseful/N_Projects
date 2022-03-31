/* Przykładowa aplikacja, gdy w adresie pojawi się parametr `name`, wita naszego użytkownika po nazwie. 
(http://localhost:4700/?name=Jan)
Zmodyfikujmy ten kod tak aby był wykorzystywany framework `Express` 
i dodatkowo parametr pobierajmy z URL a nie z query stringa (http://localhost:4700/Anna)
*/

// // BASIC WAY:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   const url = new URL(`http://${req.headers.host}${req.url}`);
//   const name = url.searchParams.get("name") || "World";

//   res.end(`Hello ${name}`);
// });
// app.listen(4700);

// WITH EXPRESS:
//npm install express
const express = require("express");

const app = express(); // tworzymy nową instancję serwera
app.disable("x-powered-by"); // wyłącz informację przesyłaną w info

// dodajemy regułę do naszego serwera
// jeżeli użytkownik wejdzie na nasz web serwer
app.get("/:username?", (req, res) => {
  const name = req.params.username || "World";
  res.send(`Hello ${name}`);
});

app.listen(4700, () => console.log("server started")); // uruchamiamy nasz web serwer na porcie 4700
