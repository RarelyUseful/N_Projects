const request = require("request");

const getUser = (id) => {
  let url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        const user = JSON.parse(body);
        //console.log(user.name, user.address.geo.lat, user.address.geo.lng);
        //resolve(user.name, user.address.geo.lat, user.address.geo.lng);
        resolve(user);
      } else {
        reject(console.log("Error when calling API: ", response.statusMessage));
      }
    });
  });
};
const getWeather = (user) => {
  let lat = user.address.geo.lat;
  let lng = user.address.geo.lng;
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        const weather = JSON.parse(body);
        resolve(weather);
      } else {
        reject(console.log("Error when calling API: ", response.statusMessage));
      }
    });
  });
};

// getUser(2)
//task 6:
const p1 = getUser(2);
const p2 = getUser(5);
const p3 = getUser(7);

Promise.all([p1, p2, p3])
  .then((user) => {
    user.forEach((u) => {
      console.log(u.name);
      return getWeather(u);
    });
  })
  //.then((weather) => console.log(weather.weather[0]))
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("finished"));
