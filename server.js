const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // This will enable CORS for all routes

app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
