const {Router} = require('express');
const Course = require('../models/Course');
const router = Router();

router.get('/', async (request, response) => {
    const courses = await Course.find().lean();
    response.render('data-render', {
        title: "Data Render",
        isDataRender: true,
        courses
    })
});

router.get('/:id/edit', async (request, response) => {
    if (!request.query.allow) {
        return response.redirect('/');
    }
    const course = await Course.findById(request.params.id).lean();
    console.log('edit', course);

    response.render('course-edit', {
        title: 'Edit course',
        course
    })
});

router.post('/edit', async (request, response) => {
    const course = new Course({
        title: request.body.title,
        price: request.body.price,
        img: request.body.img,
        _id: request.body.id
    });
    // const log = new DataLog(request.body.info, request.body.num);
    console.log('edit course', course);
    try {
        await Course.updateOne(course);
        response.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
});

router.get('/:id', async (request, response) => {
    const course = await Course.findById(request.params.id).lean();
    console.log('get', course);

    response.render('course', {
        title: 'Course',
        course
    })
});

module.exports = router;
