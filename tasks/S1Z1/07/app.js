const os = require('os');

const user = os.userInfo();

console.log(user.username);

const fs = require('fs');

fs.writeFileSync('userInfo.txt', user.username);
