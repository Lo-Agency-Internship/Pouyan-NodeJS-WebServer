const http = require("http");
const fs = require("fs");

const server = http.createServer(function (request, response) {
  let filePath = request.url;
  let CleanFilePath = filePath.trim().toLowerCase();
  let indexOfDot = CleanFilePath.indexOf(".");
  let fileExtension = CleanFilePath.slice(indexOfDot);
  filePath = "." + filePath;
  var fileTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".webp": "image/webp",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
  };

  if (request.url === "/") {
    fs.readFile("index.html", function (err, data) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      return response.end();
    });
  } else {
    fs.readFile(filePath, function (err, data) {
      if (err) {
        response.writeHead(404, { "Content-Type": "text/html" });
        return response.end("404 Not Found");
      } else {
        response.writeHead(200, {
          "Content-Type": `${fileTypes[fileExtension]}`,
        });
        response.write(data);
        return response.end();
      }
    });
  }
});

server.listen(8080);

console.log("server running on 8080");
