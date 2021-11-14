const {Router} = require('express');
const router = Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
        let orders = await Order.find({
            'user.userId': req.user.id
        })
            .populate('user.userId');

        orders = orders.map(o => {
            const courses = o.courses.map(c => (c._doc));
            const user = o.user.userId._doc;
            return {
                ...o._doc,
                courses: courses,
                user,
                price: o.courses.reduce((total, course) => {
                    return total += course.count * course.course.price
                }, 0)
            }
        });
        console.log("ORDERS", orders);

        res.render('orders', {
            isOrders: true,
            title: 'Orders',
            orders
        })
    } catch (e) {
        console.log("error during catch order", e)
    }
});

router.post('/', async (req, resp) => {
    try {
        const user = await req.user
            .populate('cart.items.courseId')
            .execPopulate();
        const courses = user.cart.items.map((item) => ({
            count: item.count,
            course: {...item.courseId._doc}
        }));
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses
        });
        await order.save();
        await req.user.clearCart();
        resp.redirect('/orders');
    } catch (e) {
        console.log("error during make order", e)
    }
});

module.exports = router;
