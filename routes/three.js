var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function(req, res, next) {
  res.render('three');
});

/* POST users listing. */
router.post('/square', function(req, res, next) {
  res.render('three_square');
});

/* POST users listing. */
router.post('/teapot', function(req, res, next) {
  res.render('teapot');
});

module.exports = router;
