var express = require('express');
var router = express.Router();
var crudController = require("../controllers/crudController");

// router.get('/', function(req, res, next) {
//   console.log(`This is url ${req.url}`);
//   let optionObj = {
//     filterBy   : { category : "academic" },
//     renderName : "academic"
//   }
// crudController.getPostList(req, res, optionObj);
// });


module.exports = router;
