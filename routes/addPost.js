var express = require('express');
var router = express.Router({mergeParams: true});
//var dataUtil = require("./post-util");
//var _DATA = dataUtil.loadData().posts;
//var len = _DATA.length

router.get('/', function(req, res, next) {
  res.render('addPost');
});

router.post('/', function(req, res) {
   var body = req.body;
     // Save new blog post
   _DATA.push(req.body);
   dataUtil.saveData(_DATA);
   res.redirect("/")
});

module.exports = router;


// addPost.route('/')
//   .get((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   })
//   .post((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   });
