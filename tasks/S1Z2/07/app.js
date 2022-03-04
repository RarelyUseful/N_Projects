const fs = require('fs');

const user = {
    name: 'Jan',
    lastName: 'Nowak'
};

let result = JSON.stringify(user);

fs.writeFileSync('user.json', result);