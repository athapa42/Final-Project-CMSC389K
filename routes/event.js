var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let optionObj = {
                filterBy   : { category : "event" },
                renderName : "event"
              }
  postController.getPostList(req, res, optionObj);
});

module.exports = router;