const {Router} = require('express');
const router = Router();
// const CardBasket = require('../models/CourseBacket');
const Course = require('../models/Course');

function mapCartItems(cart) {
    return cart.items.map((item) => ({
        ...item.courseId._doc,
        count: item.count
    }));
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0);
}


router.post('/add', async (req, resp) => {
    const course = await Course.findById(req.body.id).lean();
    // await CardBasket.add(course);
    await req.user.addToCart(course);
    resp.redirect('/basket')
});

router.delete('/remove/:id', async (req, resp) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.courseId')
        .execPopulate();
    const courses = mapCartItems(user.cart);
    const price = computePrice(courses);
    const cart = {
        courses,
        price
    };

    resp.status(200).json(cart);
});

router.get('/', async (req, res) => {
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();

    const courses = mapCartItems(user.cart);
    res.render('course-basket', {
        title: 'Basket',
        isBasket: true,
        courses: courses,
        price: computePrice(courses)
    })
});

module.exports = router;
