const models = require('../models');

module.exports = {
  list: (req, res) => {
    let searchParams = req.query;
    searchParams.userId = null;
    
    models.Animal.findAll({
      where: searchParams
    }).then((results) => {
      res.json(results);
    });
  },
  detail: (req, res) => {
    const id = req.params.id;
    models.Animal.findById(id).then((result) => {
      res.json(result);
    });
  },
  adopt: (req, res) => {
    models.Animal.findById(req.params.id).then((animal) => {
      animal.userId = req.user.id;
      animal.save().then((result) => {
        res.json(result);
      })
    });
  },
  create: (req, res) => {
    models.Animal.create({
      name: req.body.name,
      isWearingHat: req.body.isWearingHat,
      isAggressive: req.body.isAggressive,
      species: req.body.species
    }).then((results) => {
      res.json(results);
    });
  }
};
