const {Router} = require('express');
const router = Router();


router.get('/', (request, response) => {
    // response.status(200);
    // response.sendFile(path.join(__dirname, 'views', 'data-render.hbs'));
    response.render('data-render', {
        title: "Data Render",
        isDataRender: true
    })
});

module.exports = router;
