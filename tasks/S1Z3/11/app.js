// Ver 1
let timer = 0;

const loop = setInterval(() => {
  if (timer > 0) {
    console.log(`Hello after ${timer} seconds.`);
  }
  timer += 4;

  if (timer > 8) {
    clearInterval(loop);
  }
}, 4000);

// Ver 2.
let timer2 = 0;

function elo() {
  if (timer2 > 0) {
    console.log(`Hello after ${timer2} seconds. V2`);
  }
  timer2 += 4;

  if (timer2 > 8) {
    clearInterval(loop2);
  }
}
const loop2 = setInterval(elo, 4000);
