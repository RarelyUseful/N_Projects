//import modules:
const argv = require("yargs").argv;
const user = require("./user");
const repos = require("./repos");
const weather = require("./weather");
//setup for github API
const options = {
  url: "https://api.github.com/repos/request/request",
  headers: {
    "User-Agent": "request",
  },
};
//user inputs
const userId = argv.id;
let displayFollowers = 0;
displayFollowers = argv.f;
//variables
const userUrl = `https://api.github.com/users/${userId}`;
const repoUrl = `https://api.github.com/users/${userId}/repos`;

//call function
user
  .getUserInfo(userUrl, options, displayFollowers)
  .then((promiseVal) => {
    repos.getUserRepos(repoUrl, options).then(() => {
      //.then is only needed to keep order of displaying: User Info > Repo Info > Wearher Info
      if (promiseVal != "") {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=${promiseVal}`;
        weather.getUserWeater(weatherUrl);
      } else {
        console.log("*** User weather: \nCan't display weather because user location is not available.");
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

/* 
To run:
node app.js --id octocat
node app.js --id octocat --f 1

*/
