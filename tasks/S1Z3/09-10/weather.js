const request = require("request");
const fs = require("fs");

function getWeather(urlW) {
  request(urlW, (error, response, body) => {
    if (error) {
      console.log("Błąd 2.");
    } else {
      if (response.statusCode == 200) {
        console.log(JSON.parse(body).weather[0].description);
        fs.appendFile("./userdata.json", JSON.parse(body).weather[0].description + "\n", (err) => {
          if (err) {
            console.log("Error when savng the file.");
          }
          console.log("Userdata saved.");
        });
      } else {
        // task 07
        console.log("Weather search error: ");
        console.log(response.statusCode, response.statusMessage);
      }
    }
  });
}

module.exports = {
  getWeather: getWeather,
};
