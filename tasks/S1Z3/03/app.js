const fs = require('fs');
const yargs = require('yargs');
const parameters = yargs.argv;

const user = {
    name: parameters.name,
    lastName: parameters.lastName,
};

function callbackFirst(error){
    if (error) {
        console.log('zapis do pliku się nie udał')
    }
    else {
        console.log('zapis do pliku się udał')
    }
    //console.log('Aplikacja zakończona.');
};

let userFromFile;
fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('Nie udało się odczytać pliku');
    }
    else {
        userFromFile = JSON.parse(data);
        console.log(userFromFile.name)
        fs.writeFile('user.json', JSON.stringify(user), callbackFirst);
    }
    console.log('Aplikacja się zakończyła.');
});

 



// node app.js --name=Adam --lastName=Mickiewicz