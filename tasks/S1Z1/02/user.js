// deklarujemy stałą 'name' z wartością 'Jan'
const name = "Paweł";


// musimy w sposób jawny powiedzieć co jest wyeksportowane
// w tym przypadku powinniśmy stworzyć nowy obiekt zawierający 2 właściwości
module.exports = {
    name: name,
    };

// możemy też użyć takiego zapisu
// module.exports.firstName = firstName;
// module.exports.lastName = lastName;
