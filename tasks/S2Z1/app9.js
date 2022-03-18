const http = require("http");
const { url } = require("inspector");
let usersTab = [];
let currentID = 0;
function setID() {
  //let id = Date.now();
  //return id;
  currentID += 1;
  return currentID;
}
const app = http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);
  let task = url.pathname;
  let params = url.searchParams;

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
  } else if (req.method == "GET") {
    if (task == "/show") {
      res.writeHead(200, { "Content-type": "application/json" });
      if (!params.has("id")) {
        res.write("All current users: " + " \n");
        res.write(usersTab + " \n");
      } else if (params.has("id")) {
        let id = Number(params.get("id"));
        let user = usersTab.filter((x) => {
          return x[0] == id;
        });
        if (user.length > 0) {
          res.write("Found user: " + user + " \n");
        } else {
          res.writeHead(404, "User not found");
          res.write("Couldn't find user with that ID." + " \n");
        }
      }
    }
  } else if (task == "/delete" && params.has("id")) {
    let id = Number(params.get("id"));
    let user = usersTab.filter((x) => {
      return x[0] == id;
    });
    if (user.length > 0) {
      // user.flat(2); //doesn't work?
      res.writeHead(200, { "Content-type": "application/json" });
      let idx = usersTab.indexOf(user[0]);
      usersTab.splice(idx, 1);
      res.write("Deleted user." + " \n");
    } else {
      res.writeHead(404, "User not found");
      res.write("Couldn't find user with that ID." + " \n");
    }
  }

  //res.writeHead(200, { "Content-type": "application/json" });
  //res.write("Current usersTab: " + usersTab + " \n");
  //res.write("program ends");
  res.end();
});

app.listen(4700);
