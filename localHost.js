function contentType(ext) {
    var ct;

    switch (ext) {
    case '.html':
        ct = 'text/html';
        break;
    case '.css':
        ct = 'text/css';
        break;
    case '.js':
        ct = 'text/javascript';
        break;
    default:
        ct = 'text/plain';
        break;
    }

    return {'Content-Type': ct};
}

var http = require("http");
var fs = require('fs');
var url = require("url");
var path = require("path")
const port = 8000;
    
var server = http.createServer (function (request, response) {

var dir = "C:/Users/Administrator/Desktop/twitch_icon_animation/";
var uri = url.parse(request.url).pathname;

if (uri == "/") {
    uri = "index.html";
}

var filename = path.join(dir, uri);
var file2name = path.join(dir, "index.js")
var file3name = path.join(dir, "main.css")

fs.readFile(filename,
    function (err, data) {
        if (err) {
            response.writeHead(500);
            return response.end('Error loading index.html');
        }
                
        var ext = path.extname(filename)


        response.setHeader('content-type',contentType(ext));
        response.writeHead(200);
        response.end(data);
    });
}).listen(port);
        
console.log('Server running on localhost:' + port) ;