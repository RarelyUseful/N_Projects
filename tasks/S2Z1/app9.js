/*
aplikacja której zadaniem będzie operacja na tablicy zawierającej użytkowników

- stwórzmy ścieżkę `/add` do dodawania użytkownika, niech przyjmuje ona parametry 
`name`, `username`, `email` np `?name=Jan&username=janko&email=jan@nowak.abc`, 
dodanie użytkownika powinno zadziałać tyko wtedy gdy zostało wysłane żądanie typu `POST`, 
jako rezultat należy zwrócić identyfikator dodanego użytkownika 
- dodajmy ścieżkę `/show` do wyświetlania wszystkich użytkowników (gdy żądanie będzie typu `GET`)
- rozbudujmy ścieżkę `/show` tak by wyświetlała jedynie wybranego użytkownika, 
jeżeli zostanie podany odpowiedni `id` (`/show?id=1`) oraz żądanie będzie typu `GET`, 
gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
- rozszerzmy aplikację o kasowanie użytkownika poprzez ścieżkę `/delete?id=1`, 
gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
*/

const http = require("http");
const { url } = require("inspector");
let usersTab = [];
const app = http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);

  let task = url.pathname;
  let params = url.searchParams;
  function setID() {
    let id = Date.now();
    return id;
  }
  if (req.method == "POST") {
    if (task == "/add") {
      if (params.has("name") && params.has("username") && params.has("email")) {
        usersTab.push([setID(), params.get("name"), params.get("username"), params.get("email")]);
        res.writeHead(200, { "Content-type": "application/json" });
        res.write("OK, user added. ID: " + usersTab[usersTab.length - 1][0] + " \n");
      } else {
        res.writeHead(513, "Bad request");
        res.write("Error, Missing one of required parameters");
      }
    }
  }

  //res.writeHead(200, { "Content-type": "application/json" });
  res.write("Current usersTab: " + usersTab + " \n");
  res.write("program ends");

  res.end();
});

app.listen(4700);
