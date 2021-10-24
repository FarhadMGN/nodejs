const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const dataRenderRoutes = require('./routes/data-render');


const app = express();
//analog of server
// const server = http.createServer((request, response) => {
//     console.log(request.url)
//     const el = "<h1";
//     const el2 = ">hello Nodejs</";
//     const el3 = "h1>"
//     response.write(el+el2+el3);
//     response.end()
// });

const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

// set hbs module as engine for rendering html data
app.engine('hbs', hbs.engine);//registration
app.set('view engine', 'hbs');
app.set('views', 'views');//folder name with templates

app.use(express.static('public'));//register static folder with styles as static

app.use('/', homeRoutes);
app.use('/data', dataRenderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});


