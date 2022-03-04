
//let program_name = process.argv[0]; //value will be "%path_to_nodejs\node.exe"
//let script_path = process.argv[1]; //value will be "%path_to_file\app.js"
let first_value = process.argv[2]; //user input

let param =  (!first_value) ? 'world' : first_value;
// if (!first_value) {
//     param = 'world';
// }
// else {
//     param = first_value;
// }

console.log("Hello " + param);

//debugging
// console.log(program_name);
// console.log(script_path);
// console.log(param);


