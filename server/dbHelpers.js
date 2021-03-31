const axios = require('axios');
const token = require('../config.js');
const cities = require('../db/cities');

const header = {
  headers: token,
};

const dbHelpers = {
  getBusiness: (req, callback) => {
    const { url } = req;
    axios.get(`http://api.yelp.com/v3/businesses${url}`, header)
      .then((results) => callback(null, results.data))
      .catch((err) => callback(err));
  },
  getCities: (callback) => {
    callback(null, cities);
  },
};

module.exports = dbHelpers;
