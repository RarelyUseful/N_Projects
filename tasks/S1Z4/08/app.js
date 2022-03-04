const axios = require("axios");
const getUser = (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return axios.get(url);
};

const getWeather = (user) => {
  let lat = user.address.geo.lat;
  let lng = user.address.geo.lng;
  let url = `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat=${lat}&lon=${lng}`;
  return axios
    .get(url)
    .then((response) => console.log(response.data.weather[0]))
    .catch((error) => console.log(error));
};

getUser(2)
  .then((user) => {
    console.log(user.data.name);
    getWeather(user.data);
  })
  .catch((error) => console.log("Error: " + error));
