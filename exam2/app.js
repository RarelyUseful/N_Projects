/**Celem projektu jest stworzenie aplikacji pozwalającej na zarządzanie ogłoszeniami online - tablica ogłoszeń.

Każde ogłoszenie ma:

- tytuł
- opis
- autora
- kategorię
- tagi (wiele tagów)
- cenę
- ... (miejsce na Twoje pomysły, najlepsze będą punktowane dodatkowo)

Interfejs graficzny nie jest wymagany. Funkcjonalność będzie sprawdzona przy pomocy Postmana.
Należy pamiętać o obsłudze błędów, nazewnictwie endpointów, obsłudze metod HTTP oraz zwracanych kodów odpowiedzi HTTP.

Lista funkcji:

0. [zadanie konieczne do zaliczenia] Aplikacja jest udokumentowana za pomocą Postmana
    - kolekcją zawierającą przykłady żądań do wszystkich przygotowanych funkcji
x 1. [1 punkt] Port z którego korzysta aplikacja powinien być ustawiany za pomocą zmiennych środowiskowych
x 2. [1 punkt] Aplikacja na żądania wysłane pod adres `/heartbeat` odpowiada zwracając aktualną datę i godzinę
x 3. [1 punkt] Aplikacja umożliwia dodawanie ogłoszenia
x 4. [2 punkty] Aplikacja umożliwia zwracanie wszystkich ogłoszeń oraz pojedynczego ogłoszenia
x 5. [1 punkt] Aplikacja umożliwia usuwanie wybranego ogłoszenia
x 6. [1 punkt] Aplikacja umożliwia modyfikowanie wybranego ogłoszenia
7. [1 punkt za każde kryterium wyszukiwania/maksymalnie 5 punktów]
    Aplikacja pozwala na wyszukiwanie ogłoszeń według różnych kryteriów (tytuł, opis, zakres data, zakres ceny itp).
x 8. [4-8 punktów] Aplikacja zapisuje ogłoszenia w bazie danych [8 punktów] lub plikach [4 punkty]
x 9. [2 punkty] Usuwanie i modyfikowanie ogłoszeń jest zabezpieczone hasłem (np. middleware weryfikujące hasło),
    przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP. Nie jest wymagane zabezpieczenie na poziomie *produkcyjnym*, raczej podstawowe rozwiązanie.
10. [4 punkty] Aplikacja ma 3 zdefiniowanych na stałe użytkowników, każdy z nich może usuwać i modyfikować tylko
    te ogłoszenia które sam dodał, przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP
x 11. [3 punkty] Aplikacja po uruchomieniu z parametrem (np `node app.js debug`) zapisuje w pliku czas odebrania każdego
    żądania, metodę HTTP oraz adres na który przyszło żądanie
x 12. [2 punkty] Aplikacja po odebraniu żądania do adresu który nie istnieje powinna zwracać statyczny obrazek
    zamiast domyślnej strony błędu 404
x?13. [2 punkty] W przypadku wystąpienia błędów aplikacji, szczegóły błędu zapisywane są w console.log
    a użytkownik dostaje stosowny komunikat i kod odpowiedzi HTTP */
// 14. Add sample.env

require("dotenv").config();
const express = require("express");
const app = express();
const status = require("http-status");
const path = require("path");
const fs = require("fs");
const argv = require("yargs").argv;

const port = process.env.PORT;
const { init, getPosts, getPost, deletePost, addPost, updatePost, replacePost } = require("./dbsetup");
const filePath404 = path.join(__dirname, "404.jpg");

app.disable("x-powered-by");
app.use(express.json());

// Task 11 - to run with debugger $ node app.js --debug true
let debugging = false;
debugging = argv.debug;

const saveData = (data) => {
  fs.appendFile(`logs.txt`, data, (err) => {
    if (err) {
      throw err;
    }
  });
};
const requestTime = (req, res, next) => {
  let requestTime = Date.now();
  saveData("Request time " + requestTime + ", Request URL ." + req.url + ", Method: " + req.method + "\n");
  next();
};
if (debugging) {
  app.use(requestTime);
}
// end of task 11.
// Task 10. I know it's kind of stupid and this is probably something configurable in database.
const users = ["Admin", "Chuck Norris", "Queen of England"];
let currentUser = users[0];
const userCheckMiddleware = (req, res, next) => {
  const url = req.url;
  const [empty, id] = url.split("/posts/");
  console.log("catched url " + url + " so " + e + " then " + id);
  const post = getPost(id);
  postAuthor = post.Author;
  if (postAuthor == currentUser) {
    console.log("User authentication: OK");
    next();
  } else {
    console.log("401, Unauthorized.");
    res.status(401);
    res.send("user not permitted");
  }
};

function isVerifiedToken(token) {
  return token === process.env.TOKEN;
}
const authMiddleware = (req, res, next) => {
  const token = req.get("authorization");
  if (isVerifiedToken(token)) {
    console.log("Token: valid");
    next();
  } else {
    console.log("401, Unauthorized.");
    res.status(401);
    res.send("bad token");
  }
};

init()
  .then(() => {
    app.get("/posts/:id", async (req, res) => {
      const { id } = req.params;
      const post = await getPost(id);

      if (post) {
        res.send(post);
      }
      res.statusCode = status.NOT_FOUND;
      res.send();
    });

    app.get("/posts", async (req, res) => {
      const posts = await getPosts();
      res.send(posts);
    });

    app.post("/posts", async (req, res) => {
      const newPost = req.body;

      // dodaj weryfikację, gdy nie to zwróć kod 400 bez dodawania do bazy

      const result = await addPost(newPost);
      console.log(result);
      if (!!result.insertedId) {
        res.statusCode = status.CREATED;
      } else {
        console.log("Error, problem with database. Try again.");
        res.statusCode = status.INTERNAL_SERVER_ERROR;
      }

      res.send();
    });

    app.patch("/posts/:id", async (req, res, next) => {
      authMiddleware(req, res, next);
    });
    app.patch("/posts/:id", async (req, res, next) => {
      userCheckMiddleware(req, res, next);
    });
    app.patch("/posts/:id", async (req, res, next) => {
      const { id } = req.params;
      const modifiedPost = req.body;

      if (modifiedPost == null) {
        res.statusCode = status.BAD_REQUEST;
      } else {
        for (const [key, value] of Object.entries(modifiedPost)) {
          const result = await updatePost(id, key, value);
          console.log(result);

          if (result.modifiedCount === 1) {
            res.statusCode = status.NO_CONTENT;
          } else if (result.matchedCount === 1) {
            res.statusCode = status.CONFLICT;
          } else {
            res.statusCode = status.NOT_FOUND;
          }
        }
      }

      res.send();
    });

    app.delete("/posts/:id", async (req, res, next) => {
      authMiddleware(req, res, next);
    });
    app.delete("/posts/:id", async (req, res, next) => {
      userCheckMiddleware(req, res, next);
    });
    app.delete("/posts/:id", async (req, res) => {
      const { id } = req.params;
      const result = await deletePost(id);
      console.log(result);
      if (result.deletedCount == 1) {
        res.statusCode = status.NO_CONTENT;
      } else {
        res.statusCode = status.NOT_FOUND;
      }

      res.send();
    });
  })
  .finally(() => {
    app.get("/heartbeat", (req, res) => {
      res.send(new Date());
    });
    app.all("/*", (req, res) => {
      res.sendFile(filePath404);
    });

    app.listen(port, () => console.log("server started"));
  });
