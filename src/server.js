const express = require("express");
const cors = require("cors");
const { getCoordinates } = require("./emissionCoordinates");
const {
  getMappingsBundleData,
  getMappingsWithUnknownCodeIds,
  retrieveKnownMappings,
} = require("./mappingsWithUnknownCode");
const path = require("path");

const app = express().use(
  cors({
    origin: "*",
  })
);

app.get("/*", function (req, res, next) {
  res.setHeader("Last-Modified", new Date().toUTCString());
  next();
});

app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.get("/health", (req, res) => {
  res.send('{ "status": "OK" }');
});

app.get("/emissionsByCoordinates", (req, res) => {
  const coordinates = getCoordinates();
  res.send(coordinates);
});

app.get("/unknownMappings", (req, res) => {
  const mappingsData = getMappingsBundleData();
  res.send(mappingsData);
});

app.get("/unknownMappingIds", (req, res) => {
  const mappingIds = getMappingsWithUnknownCodeIds();
  res.send(mappingIds);
});

app.get("/knownMappings", (req, res) => {
  const knownMappings = retrieveKnownMappings();
  res.send(knownMappings);
});

app.post("/mappings", express.json(), (req, res) => {
  if (!req.body) return response.sendStatus(400);

  console.log("Saved all mappings");
  console.log(req.body);
  res.sendStatus(200);
});

app.get('/data/ranges', function(req, res){
    const file = `${__dirname}/samples/responseSample.json`;
    res.sendFile(file); // Set disposition and send it.
  });

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Example app is listening on port ${port}.`)
);
