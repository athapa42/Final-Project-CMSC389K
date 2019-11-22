var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('event',{
    data : {}
  });
});

module.exports = router;