var express = require('express');
var router = express.Router();
var crudController = require("../controllers/crudController");

router.get('/', function(req, res, next) {
  let optionObj = {
    filterBy   : { category : "career" },
    renderName : "career"
  }
crudController.getPostList(req, res, optionObj);
  
});

module.exports = router;
