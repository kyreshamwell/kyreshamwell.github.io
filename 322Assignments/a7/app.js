const express = require('express');
const app = express();
const port = 3000;

// For middleware
app.use(express.json()); 
app.use(express.static(__dirname)); 

app.get('/grade', (req, res) => {
    res.send('Got a GET request at /grade');
});

app.put('/grade', (req, res) => {
    res.send('Got a PUT request at /grade');
});

app.post('/grade', (req, res) => {
    res.send('Got a POST request at /grade');
});

app.delete('/grade', (req, res) => {
    res.send('Got a DELETE request at /grade');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


