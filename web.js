var fs = require("fs"),
	config = require("./config").config;

var app = require("http").createServer(handler), // handler defined below
io = require("socket.io").listen(app);


function handler (req, res) {
  fs.readFile(__dirname + "/index.html",
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }
    res.writeHead(200);
    res.end(data);
  });
}


theport = process.env.PORT || 2000;
app.listen(theport);
console.log ("http server on port: " + theport);

startIOServer();

function startIOServer () {
    console.log("Starting ...");

    // Many hosted environments do not support all transport forms currently, (specifically WebSockets).
    // So we force a relatively safe xhr-polling transport.
    // Modify io.configure call to allow other transports.

    io.configure(function () { 
    	io.set("transports", config[platform].transports); // Set config in ./config.js
    	io.set("polling duration", 10); 
	io.set("log level", 2);
    });
    io.sockets.on("connection", function (socket) {
	readAndSend(socket);
    });
};

