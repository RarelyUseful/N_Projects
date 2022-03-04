const add = async (a, b) => {
  const result = a + b;
  if (result % 2 === 0) {
    throw new Error("liczba parzysta");
  }
  return result;
};

(async () => {
  try {
    let result = await add(3, 4);
    console.log("Res1: " + result);
    let result2 = await add(4, 2);
    console.log("Res2: " + result2);
  } catch (error) {
    console.log(error);
  }
})();
