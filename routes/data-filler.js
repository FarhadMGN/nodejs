const {Router} = require('express');
const router = Router();
const DataLog = require('../models/log');

router.get('/', (request, response) => {
    response.render('data-filler', {
        title: "Fill Data",
        isDataFiller: true
    })
});

//post handler
router.post('/', async (request, response) => {
    const log = new DataLog(request.body.info, request.body.num);
    console.log(log);
    await log.save();
    response.redirect('/data');
});
module.exports = router;
