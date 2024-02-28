const express = require('express');
const { getCoordinates } = require('./emissionCoordinates');

const app = express();

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.get('/emissionsByCoordinates', (req, res) => {
    const coordinates = getCoordinates()
    res.send(coordinates);
});



app.listen(8000, () => console.log('Example app is listening on port 3000.'));
