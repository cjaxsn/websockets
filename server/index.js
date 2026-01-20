
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server by passing the Express app
const server = http.createServer(app);

// Integrate WebSocket with the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // Echo the message back to the client
        ws.send(`Echo: ${message}`);
    });

    // Send a welcome message on new connection
    ws.send('Welcome to the chat!');
});

// Default route can be removed if you are serving only static files
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});