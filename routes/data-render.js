const {Router} = require('express');
const DataLog = require('../models/log');
const router = Router();

router.get('/', async (request, response) => {
    const logs = await DataLog.getAll();
    response.render('data-render', {
        title: "Data Render",
        isDataRender: true,
        logs
    })
});

module.exports = router;
