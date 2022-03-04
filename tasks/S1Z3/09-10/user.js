const request = require("request");
const weatherMd = require("./weather");
const fs = require("fs");

let weaterUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat={LAT}&lon={LNG}";

function getUser(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Błąd.");
    } else {
      if (response.statusCode == 200) {
        let user = JSON.parse(body);
        let lat = user.address.geo.lat;
        let lng = user.address.geo.lng;
        console.log(user.name, "\n", user.address.geo.lat, "\n", user.address.geo.lng);
        fs.writeFile(
          "./userdata.json",
          user.name + "\n" + user.address.geo.lat + "\n" + user.address.geo.lng + "\n",
          (err) => {
            if (err) {
              console.log("Error when writing to file");
            }
          }
        );
        weaterUrl = weaterUrl.replace("{LAT}", lat);
        weaterUrl = weaterUrl.replace("{LNG}", lng);
        weatherMd.getWeather(weaterUrl);
      } else {
        //console.log("Status code != 200");
        //task 05:
        console.log("User search error: ");
        console.log(response.statusCode, response.statusMessage);
      }
    }
  });
}

module.exports = {
  getUser: getUser,
};
