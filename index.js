import {CONNECTION_URL} from "./secrets/database";

const express = require('express');
const expHbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const dataRenderRoutes = require('./routes/data-render');
const dataFillerRoutes = require('./routes/data-filler');
const mongoose = require('mongoose');


const app = express();

const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

// set hbs module as engine for rendering html data
app.engine('hbs', hbs.engine);//registration
app.set('view engine', 'hbs');
app.set('views', 'views');//folder name with templates

app.use(express.static('public'));//register static folder with styles as static

app.use(express.urlencoded({
    extended: true
}));
app.use('/', homeRoutes);
app.use('/courses', dataRenderRoutes);
app.use('/filler', dataFillerRoutes);

const PORT = process.env.PORT || 3000;


async function start() {
    try {
        const url = CONNECTION_URL;
        await mongoose.connect(url, {
            useNewUrlParser: true
        });
        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        });
    } catch (e) {
        console.log(e)
    }

}

start();



