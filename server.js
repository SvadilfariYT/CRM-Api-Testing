const express = require('express');
const fs = require('fs');
const app = express();

// Create a write stream in append mode
const accessLogStream = fs.createWriteStream('./access.log', { flags: 'a' });

// Middleware to log each request to a file
app.use((req, res, next) => {
    const log = `Received ${req.method} request for '${req.url}' at ${new Date().toISOString()}\n`;
    accessLogStream.write(log);
    next();
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
