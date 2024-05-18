const express = require('express');
const fs = require('fs');
const app = express();

// Create a write stream in append mode for logging
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log each request to a file
app.use((req, res, next) => {
    // Only log the details if the request method is POST and the route is /api/data
    if (req.method === 'POST' && req.url === '/api/data') {
        const { name, age } = req.body; // Destructure name and age from the request body
        const logEntry = `Received POST request for '/api/data' at ${new Date().toISOString()}`
                        + `\nName: ${name}, Age: ${age}\n`;
        accessLogStream.write(logEntry);
    } else {
        const logEntry = `Received ${req.method} request for '${req.url}' at ${new Date().toISOString()}\n`;
        accessLogStream.write(logEntry);
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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
