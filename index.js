const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post("/animals", (req, res) => {
  models.Animal.create({
    name: req.body.name,
    isWearingHat: req.body.isWearingHat,
    isAggressive: req.body.isAggressive,
    species: req.body.species
  }).then((results) => {
    res.json(results);
  });
});

app.listen(3000);
