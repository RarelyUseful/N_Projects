console.log("start app");

const helloPromise = new Promise((resolve, reject) => {
  const del = setTimeout(function () {
    resolve("Hello world");
  }, 5000);
});

helloPromise.then((text) => {
  console.log(text);
});
console.log("end app");
