var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Welcome to Sample Node API!' });
});

module.exports = router;
