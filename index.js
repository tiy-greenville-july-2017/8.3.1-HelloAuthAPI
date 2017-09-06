const express = require('express');
const models = require('./models');
const bodyParser = require('body-parser');
const AnimalController = require('./controllers/animal');

const app = express();
app.use(bodyParser.json());

app.get("/animals", AnimalController.list);
app.get("/animals/:id", AnimalController.detail);
app.post("/animals", AnimalController.create);

app.listen(3000);
