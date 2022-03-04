const request = require("request");

const getUser = (id) => {
  let url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return new Promise((res, rej) => {
    request(url, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        const user = JSON.parse(body);
        res(user.name);
      } else {
        rej(console.log("Error when calling API: ", response.statusMessage));
      }
    });
  });
};

getUser(2)
  .then((name) => {
    console.log(name);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("finished"));
