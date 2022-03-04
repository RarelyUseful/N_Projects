const request = require("request");

function getUserWeater(url) {
  request(url, (error, response, body) => {
    if (error) {
      console.log("Error while requesting weater API.");
    } else {
      if (response.statusCode == 200) {
        const data = JSON.parse(body);
        console.log("*** User weather: ");
        console.log(`${data.weather[0].main}, ${data.weather[0].description}`);
      } else {
        console.log("Weather status code error:");
        console.log(response.statusCode);
        console.log(response.statusMessage);
        console.log(`debug, check url: ${url}`);
      }
    }
  });
}

module.exports = {  
    getUserWeater: getUserWeater,  
};