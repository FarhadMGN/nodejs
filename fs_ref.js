const fs = require('fs');
const path = require("path");


//mkDir is async creation of folder - use this method due to mkDirSync will block flow
// fs.mkdir(path.join(__dirname, 'notes'), (error) => {
//     if (error) {
//         throw new Error(error);
//     } else {
//         console.log('folder will create')
//     }
// });

fs.writeFile(
    path.join(__dirname, 'notes.js'),
    'File content',
    (error) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log('file created')
        }
    }
);

fs.readFile(path.join(__dirname, 'notes.js'),
    (error, data) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(Buffer.from(data).toString())
        }
    });
