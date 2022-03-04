const axios = require("axios");

const getUser = (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  return axios.get(url);
};
const getAlbums = (userId) => {
  const url = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
  return axios.get(url);
};
const getphotos = (userId) => {
  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${userId}`;
  return axios.get(url);
};
getUser(2)
  .then((response) => {
    console.log(response.data.name);
    return getAlbums(response.data.id);
  })
  .then((response) => {
    console.log("**** Albumy: ");
    response.data.map((e) => console.log(e.title));
    return getphotos(response.data[0].id);
  })
  .then((response) => {
    console.log("**** Zdjęcia: ");
    response.data.map((e) => console.log(e.title));
  })
  .catch((error) => console.log(error));
