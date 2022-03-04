const fs = require('fs');
if (!process.argv[2]){
    console.log(`Wynik działania aplikacji: ${'\n'}> zbyt mało parametrów!`);
    return;};
if (process.argv[3]){
    console.log(`Wynik działania aplikacji: ${'\n'}> zbyt dużo parametrów!`);
    return;}
else {
    const path =  process.argv[2];
    fs.readdir(path, (err, files) => {
        if (err)
          console.log(err);
        else {
          console.log(`Wynik działania aplikacji: ${'\n'}Pliki w folderze ${path}: `);
          files.forEach(file => {
            console.log(file);
          })
        }
      })
}