let count = 0;
const loop = setInterval(() => {
  console.log("Hello");
  count++;
  if (count === 5) {
    console.log("Finish");
    clearInterval(loop);
  }
}, 1000);
