const {Router} = require('express');
const router = Router();

router.get('/', (request, response) => {
    response.render('index', {
        title: "General Page",
        isHome: true
    });
});

module.exports = router;
