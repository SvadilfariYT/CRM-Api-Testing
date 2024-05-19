const express = require('express');
const fs = require('fs');
const app = express();

// Create a write stream in append mode for logging
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log each request to a file
app.use((req, res, next) => {
    const logEntry = `[${new Date().toISOString()}]: Received ${req.method} request for '${req.url}'\n`;
    accessLogStream.write(logEntry);

    // Only log the details if the request method is POST and the route is /api/data
    if (req.method === 'POST' && req.url === '/api/data') {
        const { name, age } = req.body; // Destructure name and age from the request body
        const data = `Name: ${name}, Age: ${age}\n`;
        accessLogStream.write(data);
    }
    if (req.method === 'Post' && req.url === '/webhook') {
        const { name, age } = req.body; // Destructure name and age from the request body
        const data = `Name: ${name}, Age: ${age}\n`;
        accessLogStream.write(data);
    }
    next();
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a route that accepts JSON data
app.post('/api/data', (req, res) => {
    const { name, age } = req.body;  // Access the name and age sent by the client
    res.json({ message: 'Data received', name: name, age: age });
});

app.post('/webhook', (req, res) => {
    const { name, age } = req.body;  // Access the name and age sent by the client
    accessLogStream.write(`Webhook received: ${name} (${age})`);

    // Respond to the source system that the webhook was received and processed
    res.json({ status: 'success', message: 'Webhook processed' });
    res.status(200).send('Webhook received');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
