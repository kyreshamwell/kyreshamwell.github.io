const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
http.createServer((request, response) => {
    let filePath = '.' + request.url;
    if (filePath === './')  {
        filePath = './index.html';
    } else if (filePath === './introduction') {
        filePath = './introduction.html';
    }

    // Determine content type
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end("404 Not Found");
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(3000);

console.log('Server running at http://localhost:3000/');
