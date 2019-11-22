var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('addPost');
});

module.exports = router;


// addPost.route('/')
//   .get((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   })
//   .post((req, res) => {
//     res.render('addPost', {pokemons: pokemons});
//   });