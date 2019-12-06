var express = require('express');
var router = express.Router({mergeParams: true});
var crudController = require('../controllers/crudController');
//var dataUtil = require("../post-util");
//var _DATA = dataUtil.loadData().posts;
//var len = _DATA.length

router.get('/', function(req, res, next) {
  res.render('addPost');
});

router.post('/', crudController.createPost);



module.exports = router;


// addPost.route('/')
//   .get((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   })
//   .post((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   });



 //  var body = req.body;
  //    // Save new blog post
  //  _DATA.push(req.body);
  //  dataUtil.saveData(_DATA);