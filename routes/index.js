var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

/* GET home page. */
router.get('/', (req, res) => {
  postController.getPostList(req, res, {filterBy : {}, renderName: "home"});
});

module.exports = router;
