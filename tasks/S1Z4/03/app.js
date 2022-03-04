const sub = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b > a) {
      reject("error");
    } else {
      resolve(a - b);
    }
  });
};

sub(3, 4)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
sub(5, 4)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
