var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
var dotenv = require('dotenv');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var indexRouter = require('./routes/index');
var aboutUsRouter = require('./routes/aboutUs');
var academicRouter = require('./routes/academic');
var careerRouter = require('./routes/career');
var chatRouter = require('./routes/chat');
var addPostRouter = require('./routes/addPost');
var researchRouter = require('./routes/research');
var eventRouter = require('./routes/event');
var sportRouter = require('./routes/sport');


app.use('/', indexRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/academic', academicRouter);
app.use('/career', careerRouter);
app.use('/chat', chatRouter);
app.use('/addPost', addPostRouter);
app.use('/research', researchRouter);
app.use('/event', eventRouter);
app.use('/sport', sportRouter);



app.get('*', function(req, res){
    res.render("404",{});
  });
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});