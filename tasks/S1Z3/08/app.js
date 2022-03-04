const request = require("request");
const argv = require("yargs").argv;
// task 06:
const userId = argv.id;
const userUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
let weaterUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={LAT}&lon={LNG}";

function getUser(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Błąd przy pobieraniu API.");
    } else {
      if (response.statusCode == 200) {
        let user = JSON.parse(body);
        let lat = user.address.geo.lat;
        let lng = user.address.geo.lng;
        console.log(user.name, "\n", user.address.geo.lat, "\n", user.address.geo.lng);
        weaterUrl = weaterUrl.replace("{LAT}", lat);
        weaterUrl = weaterUrl.replace("{LNG}", lng);
        getWeather(weaterUrl);
      } else {
        //console.log("Status code != 200");
        //task 05:
        console.log("User search error: ");
        console.log(response.statusCode, response.statusMessage);
      }
    }
  });
}

function getWeather(urlW) {
  request(urlW, (error, response, body) => {
    if (error) {
      console.log("Błąd 2.");
    } else {
      if (response.statusCode == 200) {
        console.log(JSON.parse(body).weather[0].description);
      } else {
        // task 07
        console.log("Weather search error: ");
        console.log(response.statusCode, response.statusMessage);
      }
    }
  });
}
getUser(userUrl);
