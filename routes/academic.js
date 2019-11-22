var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('academic', {
    data : {}
  });
});

module.exports = router;
