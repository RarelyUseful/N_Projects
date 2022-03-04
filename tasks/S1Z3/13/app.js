let c = 1;
function boop() {
  setTimeout(boop, c * 1000);
  console.log("Hello world " + c);
  c++;
}

boop();
