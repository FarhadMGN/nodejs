const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        if (request.url === '/') {
            fs.readFile(
                path.join(__dirname, 'views', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    } else {
                        response.end(content);
                    }
                }
            )
        } else if (request.url === '/about') {
            fs.readFile(
                path.join(__dirname, 'views', 'about.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err;
                    } else {
                        response.end(content);
                    }
                }
            )
        } else if (request.url === '/api/users') {
            response.writeHead(200, {
                "Content-Type": "text/json"
            });
            const users = [{
                name: 'jhon',
                age: 25
            },{
                name: 'oleg',
                age: 29
            }];
            response.end(JSON.stringify(users));
        }
    } else if (request.method === "POST") {
        const body = [];
        request.on('data', data => {
            body.push(Buffer.from(data));
        });
        response.writeHead(200, {
            "content-type": "text/html"
        });
        request.on('end', () => {
            const message = (body.toString().split('=')[1]);
            response.end(`
        <h1>Your Message: ${message}</h1>
        `)
        });
    }
});

server.listen(3000, () => {
    console.log("server is running")
});


