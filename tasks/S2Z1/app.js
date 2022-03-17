//https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=Białystok

//// 01:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   res.end("Hello world from server");
// });
// app.listen(4700);

// // 02:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   res.writeHead(201, { "Content-type": "text/plain" });
//   res.write("Hello world from server!");

//   res.end();
// });

// app.listen(4700);

// // 03:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   if (req.method === "GET") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write("Hello world from server! GET method");
//   } else if (req.method === "POST") {
//     res.writeHead(201, { "Content-type": "application/xml" });
//     res.write("Hello world from server! POST method");
//   } else if (req.method === "HEAD") {
//     res.writeHead(202, { "Content-type": "application/xml" });
/* HEAD nie ma body, więc nie może nic zwrócic */
//   }
//   res.end();
// });

// app.listen(4700);

// // 04:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   if (req.url === "/users") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write("Hello from Users path");
//   } else if (req.url === "/comments") {
//     res.writeHead(201, { "Content-type": "application/xml" });
//     res.write("Hello from Comments path");
//   }
//   res.end();
// });

// app.listen(4700);

// // 05:
// const http = require("http");
// const app = http.createServer((req, res) => {
//   const url = new URL(`http://${req.headers.host}${req.url}`);
//   const name = url.searchParams.get("name") || "world";

//   res.writeHead(200, { "Content-type": "application/xml" });
//   res.write(`Hello ${name}`);

//   res.end();
// });

// app.listen(4700);

// 06:
// const http = require("http");
// const { url } = require("inspector");
// const app = http.createServer((req, res) => {
//   const url = new URL(`http://${req.headers.host}${req.url}`);
//   const a = url.searchParams.get("a") || "0";
//   const b = url.searchParams.get("b") || "0";

//   res.writeHead(200, { "Content-type": "application/xml" });
//   res.write(`Inputs: ${a}, ${b}, multiplication result: ${a * b}`);

//   res.end();
// });

// app.listen(4700);

//07
// const http = require("http");
// const { url } = require("inspector");
// const app = http.createServer((req, res) => {
//   const url = new URL(`http://${req.headers.host}${req.url}`);
//   const a = url.searchParams.get("a") || "0";
//   const b = url.searchParams.get("b") || "0";
//   const task = url.pathname;

//   if (task == "/mnozenie") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write(`Inputs: ${a}, ${b}, mul result: ${Number(a) * Number(b)}`);
//   } else if (task == "/dzielenie") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write(`Inputs: ${a}, ${b}, div result: ${Number(a) / Number(b)}`);
//   } else if (task == "/dodawanie") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write(`Inputs: ${a}, ${b}, sum result: ${Number(a) + Number(b)}`);
//   } else if (task == "/odejmowanie") {
//     res.writeHead(200, { "Content-type": "application/xml" });
//     res.write(`Inputs: ${a}, ${b}, sub result: ${Number(a) - Number(b)}`);
//   } else {
//     res.writeHead(513, "Bad request");
//     res.write(`Yeah, well... that's just like ... bad request, man.`);
//   }
//   res.end();
// });

// app.listen(4700);

// 08
const http = require("http");
const { url } = require("inspector");
const app = http.createServer((req, res) => {
  const url = new URL(`http://${req.headers.host}${req.url}`);
  const foundParams = url.searchParams;
  let myobj;
  res.writeHead(200, { "Content-type": "application/json" });
  // foundParams.forEach((element) => {
  //   if (url.searchParams.has(element)) {
  //     myobj.append(element, url.searchParams.get(element));
  //   }
  // });
  for (let key of foundParams) {
    res.write(key.toString());
    // myobj.assign(key, foundParams.get(key));
  }
  //res.write(JSON.stringify(foundParams));

  res.write(JSON.stringify(myobj));
  res.end();
});

app.listen(4700);
