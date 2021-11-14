const {Schema, model} = require('mongoose');

// const User = {
//     name: "Oleg",
//     sayHello() {
//         console.log("hello");
//     }
// };

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    },
});

// use function notation due to we will use this
userSchema.methods.addToCart = function(course) {
    const items = [...this.cart.items];
    const idx = items.findIndex((el) => el.courseId.toString() === course._id.toString());
    if (idx >= 0) {
        items[idx].count += 1;
    } else {
        const newCartItem = {
            count: 1,
            courseId: course._id,
        };
        items.push(newCartItem);
    }
    // this.cart.items = [...items];
    this.cart = {items};
    return this.save();
};

userSchema.methods.removeFromCart = function(courseId) {
    let items = [...this.cart.items];
    const idx = items.findIndex((el) => el.courseId.toString() === courseId.toString());
    if (idx >= 0 && items[idx].count === 1) {
        items = items.filter((el) => el.courseId.toString() !== courseId.toString());
    } else {
        items[idx].count -= 1;
    }
    this.cart.items = [...items];
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = {items: []};
    return this.save();
};

module.exports = model('User', userSchema);
