const user1 = require("./user");
const path = require("path");
const os = require("os");

console.log(user1.name);

user1.sayHello();

console.log(path.basename(__dirname));

console.log(os.hostname());


