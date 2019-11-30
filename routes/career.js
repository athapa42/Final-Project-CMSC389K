var express = require('express');
var router = express.Router();
var postController = require("../controllers/postController");

router.get('/', function(req, res, next) {
  let optionObj = {
    filterBy   : { category : "career" },
    renderName : "career"
  }
postController.getPostList(req, res, optionObj);
  
});

module.exports = router;
