const request = require("request");
const argv = require("yargs").argv;
// task 06:
const userId = argv.id;
const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
let urlW = "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={LAT}&lon={LNG}";

request(url, (error, response, body) => {
  if (error) {
    console.log("Błąd.");
  } else {
    if (response.statusCode == 200) {
      let user = JSON.parse(body);
      let lat = user.address.geo.lat;
      let lng = user.address.geo.lng;
      console.log(user.name, "\n", user.address.geo.lat, "\n", user.address.geo.lng);
      urlW = urlW.replace("{LAT}", lat);
      urlW = urlW.replace("{LNG}", lng);
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
    } else {
      //console.log("Status code != 200");
      //task 05:
      console.log("User search error: ");
      console.log(response.statusCode, response.statusMessage);
    }
  }
});
