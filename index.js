const http = require("http");
const express = require("express");
const path = require('path');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// WebSocket connection
io.on('connection', (socket) => {
    console.log("A user connected");

    socket.on("msg", (message) => {
        console.log("A New User Message: ", message);
        // Emit the message to all connected clients
        io.emit("msg", message); // Emit 'msg' instead of 'message' for consistency
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});

// Serve static files from the 'public' folder
app.use(express.static(path.resolve('./public')));

// Serve the index.html file on the root route
app.get("/", (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

// Start the server on port 9000
server.listen(9000, () => 
    console.log('Server Started at Port 9000')
);