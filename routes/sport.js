var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('sport', {
    data : {}
  });
});

module.exports = router;