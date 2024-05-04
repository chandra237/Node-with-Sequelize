const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My Home page</title></head>');
        res.write('<body><h1>Hello, this message is from the nodejs server</h1><form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/users'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>My Home page</title></head>');
        res.write('<body><ul><li>user1</li><li>user2</li><li>user3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });

        req.on('end',()=>{
            const parsedText = Buffer.concat(body).toString();
            const username = parsedText.split('=')[1];
            console.log(username);
            fs.writeFileSync('usernames.txt',username);
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        })
        
    }

});

server.listen(5000);