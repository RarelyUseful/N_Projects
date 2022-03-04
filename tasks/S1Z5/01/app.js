const myFuncWithPromise = () => {
  return new Promise((resolve, rejest) => {
    resolve("hello world");
  });
};

myFuncWithPromise().then((result) => {
  console.log(result);
});

const myFuncWithAsync = async () => {
  return "hello world from async(promise)";
};

myFuncWithAsync().then((result) => {
  console.log(result);
});
