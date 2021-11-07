const {Router} = require('express');
const router = Router();
const CardBasket = require('../models/CourseBacket');
const Course = require('../models/Course');

router.post('/add', async (req, resp) => {
    const course = await Course.findById(req.body.id).lean();
    await CardBasket.add(course);
    resp.redirect('/basket')

});

router.delete('/remove/:id', async (req, resp) => {
    const card = await CardBasket.remove(req.params.id);
    resp.status(200).json(card);
});

router.get('/', async (req, res) => {
    const cardBasket = await CardBasket.fetch();
    res.render('course-basket', {
        title: 'Basket',
        isBasket: true,
        courses: cardBasket.courses,
        price: cardBasket.price
    })
});

module.exports = router;
