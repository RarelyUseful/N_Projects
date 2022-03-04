const fs = require("fs");

fs.stat(__filename, (err, stat) => {
  if (err) throw err;
  console.log("* File created: " + stat.birthtime);
  console.log("* File modified: " + stat.mtime);
  console.log("* File size: " + stat.size + " B");
});

/* 
To run:
node app.js

*/
