const request = require("request");

function getUserRepos(url, opt) {
  return new Promise ((resolve, reject) => {
  request(url, opt, (error, response, body) => {
    if (error) {
      console.log("Error while requesting repos API.");
    } else {
      if (response.statusCode == 200) {
        const repo = JSON.parse(body);
        console.log("*** Repository name(s): ");
        repo.forEach((element) => {
          console.log(element.name);
        });
        resolve ();
      } else {
        console.log("Repos status code error:");
        console.log(response.statusCode);
        console.log(response.statusMessage);
        reject();
      }
    }
  });
})
}

module.exports = {
  getUserRepos: getUserRepos,
};
