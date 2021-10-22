const http = require('http');

const server = http.createServer((request, response) => {
    console.log(request.url)
    const el = "<h1";
    const el2 = ">hello Nodejs</";
    const el3 = "h1>"
    response.write(el+el2+el3);
    response.end()
});

server.listen(3000, () => {
    console.log("server is running")
});


