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
x 7. [1 punkt za każde kryterium wyszukiwania/maksymalnie 5 punktów]
    Aplikacja pozwala na wyszukiwanie ogłoszeń według różnych kryteriów (tytuł, opis, zakres data, zakres ceny itp).
x 8. [4-8 punktów] Aplikacja zapisuje ogłoszenia w bazie danych [8 punktów] lub plikach [4 punkty]
x 9. [2 punkty] Usuwanie i modyfikowanie ogłoszeń jest zabezpieczone hasłem (np. middleware weryfikujące hasło),
    przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP. Nie jest wymagane zabezpieczenie na poziomie *produkcyjnym*, raczej podstawowe rozwiązanie.
x 10. [4 punkty] Aplikacja ma 3 zdefiniowanych na stałe użytkowników, każdy z nich może usuwać i modyfikować tylko
    te ogłoszenia które sam dodał, przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP
x 11. [3 punkty] Aplikacja po uruchomieniu z parametrem (np `node app.js debug`) zapisuje w pliku czas odebrania każdego
    żądania, metodę HTTP oraz adres na który przyszło żądanie
x 12. [2 punkty] Aplikacja po odebraniu żądania do adresu który nie istnieje powinna zwracać statyczny obrazek
    zamiast domyślnej strony błędu 404
x 13. [2 punkty] W przypadku wystąpienia błędów aplikacji, szczegóły błędu zapisywane są w console.log
    a użytkownik dostaje stosowny komunikat i kod odpowiedzi HTTP */
// 14. Add sample.env

require("dotenv").config();
const express = require("express");
const app = express();
const status = require("http-status");
const path = require("path");
const fs = require("fs");
const argv = require("yargs").argv;
const mongoose = require("mongoose");

const port = process.env.PORT;
const {
  init,
  getPosts,
  getPost,
  deletePost,
  addPost,
  updatePost,
  replacePost,
  searchPosts,
  searchTags,
} = require("./dbsetup");
const { PostingFrame } = require("./schema");
const { userCheckMiddleware, authMiddleware } = require("./middleware");
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

init()
  .then(() => {
    app.get("/posts/:id", async (req, res) => {
      const { id } = req.params;
      const post = await getPost(id);

      if (post) {
        res.send(post);
      } else {
        res.sendFile(filePath404);
        res.statusCode = status.NOT_FOUND;
      }
    });

    app.get("/posts", async (req, res) => {
      const posts = await getPosts();
      res.send(posts);
    });

    app.get("/search", async (req, res) => {
      const search = await searchPosts(req);
      res.send(search);
    });
    app.get("/searchtags", async (req, res) => {
      const searchtag = await searchTags(req);
      res.send(searchtag);
    });

    app.post("/posts", async (req, res) => {
      const PostModel = mongoose.model("Post", PostingFrame);
      const newPost = new PostModel(req.body);
      const error = newPost.validateSync();
      if (!error) {
        const result = await addPost(newPost);
        console.log(result);
        if (!!result.insertedId) {
          res.statusCode = status.CREATED;
        } else {
          console.log("Error, problem with database. Try again.");
          res.statusCode = status.INTERNAL_SERVER_ERROR;
        }

        res.send();
      } else {
        console.log("Components missing in post");
        console.log(error.message);
        res.statusCode = status.BAD_REQUEST;
        res.send();
      }
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
            res.sendFile(filePath404);
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
        res.sendFile(filePath404);
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
      res.statusCode = status.NOT_FOUND;
    });

    app.listen(port, () => console.log("server started"));
  });
