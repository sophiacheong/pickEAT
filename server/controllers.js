const dbHelpers = require('./dbHelpers');

const controllers = {
  getBusiness: (req, res) => {
    dbHelpers.getBusiness(req, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  getCities: (req, res) => {
    dbHelpers.getCities((err, results) => {
      if (err) res.status(404).send(err);
      else res.status(200).send(results.cities);
    });
  },
};

module.exports = controllers;
