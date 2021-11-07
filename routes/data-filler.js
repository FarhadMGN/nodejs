const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/', (request, response) => {
    response.render('data-filler', {
        title: "Fill Data",
        isDataFiller: true
    })
});

//post handler
router.post('/', async (request, response) => {
    const course = new Course({
        title: request.body.title,
        price: request.body.price,
        img: request.body.img
    });
    // const log = new DataLog(request.body.info, request.body.num);
    console.log(course);
    try {
        await course.save();
        response.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
});
module.exports = router;
