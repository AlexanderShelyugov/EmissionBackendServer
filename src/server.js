const express = require('express')
const cors = require('cors')
const { getCoordinates } = require('./emissionCoordinates');
const { getMappingsBundleData, getMappingsWithUnknownCodeIds } = require('./mappingsWithUnknownCode');

const app = express()
    .use(cors({
        "origin": "*"
    }))

app.get('/*', function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})

app.get('/', (req, res) => {
    res.send('Successful response.');
})

app.get('/emissionsByCoordinates', (req, res) => {
    const coordinates = getCoordinates()
    res.send(coordinates)
})

app.get('/unknownMappings', (req, res) => {
    const mappingsData = getMappingsBundleData()
    res.send(mappingsData)
})

app.get('/unknownMappingIds', (req, res) => {
    const mappingIds = getMappingsWithUnknownCodeIds()
    res.send(mappingIds)
})

const port = process.env.PORT
app.listen(port, () => console.log(`Example app is listening on port ${port}.`))
