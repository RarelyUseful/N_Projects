const fs = require("fs");
const request = require("request");

const path = "./data.json";

if (fs.existsSync(path)) {
  const json = fs.readFileSync(path);
  const fileContent = JSON.parse(json);
  const number = fileContent.number;
  const filename = fileContent.filename;
  const url = `http://numbersapi.com/${number}`;
  request(url, (error, response, body) => {
    if (error) {
      console.log("API request error.");
    } else {
      if (response.statusCode == 200) {
        fs.writeFile(filename, body, (err) => {
          if (err) throw err;
          console.log("The file has been saved!");
        });
      } else {
        console.log("Error, Status Code: " + response.statusCode + ", " + response.statusMessage);
      }
    }
  });
} else {
  console.log("Something is wrong with input file.");
}

/* 
To run:
node app.js 

*/
