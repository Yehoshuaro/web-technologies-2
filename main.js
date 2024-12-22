import fs from 'fs';

/*fs.writeFile('example.txt', "Just my own example of the task - Akhmet Yerkhan", (err) => {
    if (err) throw err;
    console.log('File has been successfully created');
});
*/


/*
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    else{
        console.log(data);
    }
})
*/


/*
fs.rename('example.txt', 'some_document.txt', (err) => {
    if (err) throw err;
    console.log('File has been renamed')
})
*/


fs.unlink('text.txt', (err) => {
    if (err) throw err;
    console.log('File was deleted!');
});
