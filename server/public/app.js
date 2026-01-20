//const ws = new WebSocket(`ws://${window.location.host}`);
const ws = new WebSocket(`ws://localhost:3001`);
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

console.log(window.location.host);

ws.onopen = () => {
    console.log('Connected to the server');
};

ws.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    messages.appendChild(message);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from the server');
};

sendButton.onclick = () => {
    const message = messageInput.value;
    ws.send(message);
    messageInput.value = '';
};