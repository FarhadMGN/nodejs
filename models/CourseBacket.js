const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'mock-data',
    'course-basket.json'
);

class CourseBasket {
    static async add(course) {
        const card = await CourseBasket.fetch();
        const idx = card.courses.findIndex(el => el._id === course._id);
        const candidate = card.courses[idx];
        console.log('idx', idx, 'course', course, 'candidate', candidate);

        if (candidate) {
            candidate["count"] += 1;
            card.courses[idx] = candidate;
        } else {
            course["count"] = 1;
            console.log('course111', course);
            card.courses.push(course);
        }

        card.price += +course.price;
        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        }))
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            })
        })
    }

    static async remove(id) {
        const card = await CourseBasket.fetch();
        const idx = card.courses.findIndex(el => el._id === id);
        const candidate = card.courses[idx];
        console.log('idx', idx, 'card', card, 'candidate', candidate);


        if (candidate.count === 1) {
            card.courses = card.courses.filter(el => el._id !== id)
        } else {
            candidate.count -= 1;
        }
        card.price -= candidate.price;
        return new Promise(((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            })
        }))
    }

}

module.exports = CourseBasket;
