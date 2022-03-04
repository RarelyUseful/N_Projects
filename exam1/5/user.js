const request = require("request");

let location = "";

function getUserInfo(url, opt, displayFollowers) {
  return new Promise((resolve, reject) => {
    request(url, opt, (error, response, body) => {
      if (error) {
        console.log("Error while requesting user API.");
      } else {
        if (response.statusCode == 200) {
          const user = JSON.parse(body);
          console.log("*** User info: ");
          console.log(`User name: ${user.name}`);
          if (displayFollowers === 1) {
            console.log(`Followers: ${user.followers}`);
          }
          console.log(`Publc repos: ${user.public_repos}`);
          if (user.location != null) {
            location = user.location;
            location = location.replace(/ /g, "%20");
          }
          //console.log(location);
          resolve(location);
        } else {
          console.log("User status code error:");
          console.log(response.statusCode);
          console.log(response.statusMessage);
          reject();
        }
      }
    });
  });
}

module.exports = {
  getUserInfo: getUserInfo,
};
