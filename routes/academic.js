var express = require('express');
var router = express.Router();
var postController = require("../controllers/postController");

// router.get('/', function(req, res, next) {
//   console.log(`This is url ${req.url}`);
//   let optionObj = {
//     filterBy   : { category : "academic" },
//     renderName : "academic"
//   }
// postController.getPostList(req, res, optionObj);
// });


module.exports = router;
