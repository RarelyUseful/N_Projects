const axios = require("axios");

const getUser = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;

  return axios.get(url);
};

//task 6
const getWeather = async (id) => {
  //somelogic
};

//task 5
(async () => {
  try {
    let result = await getUser(4);
    let userid = 4;

    await getWeather(userid);
    console.log(result.data.name);
  } catch (error) {
    console.log(error);
  }
})();
