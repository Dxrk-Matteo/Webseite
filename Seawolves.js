const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    console.log(req.url)
    var contentType = "text/html"
    var fileName = __dirname + "/Seawolvesguide.html"
    if (req.url === "/home/matteo/Webseite/Basketball.png") {
        contentType = "image/jpeg"
        fileName = "/home/matteo/Webseite/Basketball.png"
    }
    else if (req.url === "/home/matteo/Webseite/bgb.jpg") {
        contentType = "image/jpeg"
        fileName = "/home/matteo/Webseite/bgb.jpg"
    }
    else if (req.url === "/home/matteo/Webseite/BBall.png") {
        contentType = "image/png"
        fileName = "/home/matteo/Webseite/BBall.png"
    }
    else if (req.url === "/Passen") {
        contentType = "text/html"
        fileName = __dirname + "/Passen.html"
    }
    else if (req.url === "/home") {
        contentType = "text/html"
        fileName = __dirname + "/Seawolvesguide.html"
    }
    fs.readFile(fileName)
        .then(contents => {
            res.setHeader("Content-Type", contentType);
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        })
}



const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});