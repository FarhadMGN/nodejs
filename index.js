const CONNECTION_URL = require("./secrets/database");
const path = require('path');
const express = require('express');
const expHbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const dataRenderRoutes = require('./routes/data-render');
const dataFillerRoutes = require('./routes/data-filler');
const courseBasketRoutes = require('./routes/course-basket');
const ordersRoutes = require('./routes/orders');
const User = require('./models/User');
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

app.use(async (req, res, next) => {
    try {
        const user = await User.findById("618fc70ec40ec960c5a06db4");
        console.log("user", user);
        req.user = user;
        next();
    } catch (e) {
        console.log("user exec error", e);
    }

});

app.use(express.static(path.join(__dirname, 'public')));//register static folder with styles as static

app.use(express.urlencoded({
    extended: true
}));
app.use('/', homeRoutes);
app.use('/courses', dataRenderRoutes);
app.use('/filler', dataFillerRoutes);
app.use('/basket', courseBasketRoutes);
app.use('/orders', ordersRoutes);

const PORT = process.env.PORT || 3000;


async function start() {
    try {
        const url = CONNECTION_URL;
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        const candidate = await User.findOne();
        console.log(candidate);
        if (!candidate) {
            const user = new User({
                email: 'polyfill@mail.ru',
                name: 'Smith',
                cart: {
                    items: []
                }
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log("Server is running on port ", PORT);
        });
    } catch (e) {
        console.log(e)
    }

}

start();



