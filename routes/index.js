var express = require('express');
var router = express.Router();
var crudController = require('../controllers/crudController');

/* GET home page. */
router.get('/', (req, res) => {
  crudController.getPostList(req, res, {filterBy : {}, renderName: "home"});
});

module.exports = router;
