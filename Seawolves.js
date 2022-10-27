const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    var fileName = __dirname + req.url
    if(!req.url || req.url === "/" || req.url === "/Seawolvesguide") {
        var fileName = __dirname + "/Seawolvesguide.html"
    }
    console.log(fileName)
    fs.access(fileName)
        .then(function () {

            
            var contentType = "text/html"
            if (req.url.endsWith(".png")) {
                contentType = "image/png"
            }
            else if (req.url.endsWith(".jpg")) {
                contentType = "image/jpeg"
            }
            else if (req.url.endsWith(".css")) {
                contentType = "text/css"
            }
            
            fs.readFile(fileName)
                .then(contents => {
                    res.setHeader("Content-Type", contentType);
                    res.writeHead(200);
                    res.end(contents);
                })
                .catch(err => {
                    console.log(err)
                    res.writeHead(500);
                    res.end(err);
                    return;
                })
            
        })
        .catch(function () {
        })
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});