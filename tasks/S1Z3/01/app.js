const fs = require('fs');

const user = {
    name: 'Jan',
    lastName: 'Nowak'
};


 function callbackFirst(error){
    if (error) {
        console.log('zapis do pliku się nie udał')
    }
    else {
        console.log('zapis do pliku się udał')
    }
    console.log('Aplikacja zakończona.');
};

fs.writeFile('user.json', JSON.stringify(user), callbackFirst);