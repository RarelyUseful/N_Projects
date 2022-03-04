const add = async (a, b) => {
  const result = a + b;
  if (result % 2 === 0) {
    throw new Error("liczba parzysta");
  }
  return result;
};

add(4, 5)
  .then((r) => {
    console.log("OK: " + r);
  })
  .catch((e) => {
    console.log("NOT_OK: " + e);
  });
add(4, 2)
  .then((r) => {
    console.log("OK: " + r);
  })
  .catch((e) => {
    console.log("NOT_OK: " + e);
  });
