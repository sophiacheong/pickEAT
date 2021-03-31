const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/search', controllers.getBusiness);

router
  .get('/cities', controllers.getCities);

module.exports = router;
