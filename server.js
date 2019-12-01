var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var handlebars = exphbs.handlebars;

// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
var dotenv = require('dotenv');
var dataUtil = require("./post-util");
var _DATA = dataUtil.loadData().posts;
var len = _DATA.length

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Load envirorment variables
dotenv.config();

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});


var indexRouter = require('./routes/index');
var aboutUsRouter = require('./routes/aboutUs');
var academicRouter = require('./routes/academic');
var careerRouter = require('./routes/career');
var chatRouter = require('./routes/chat');
var addPostRouter = require('./routes/addPost');
var researchRouter = require('./routes/research');
var eventRouter = require('./routes/event');
var sportRouter = require('./routes/sport');
var postController = require("./controllers/postController");

app.get("/post/:category", (request, response, next) => {
  let userCategory = request.params.category;
  console.log(`This is the url ${request.url}`);
  let optionObj = {
    filterBy   : { category : userCategory },
    renderName : userCategory
  }
postController.getPostList(request, response, optionObj);
//next();
})
app.get("/post/:category/:id", (request, response, next) => {
  // let userCategory = request.params.category;
  // let _id = request.params.id;

  console.log(`This is the url ${request.url}`);
  let optionObj = {
      renderName : "singlePostWithComments"
  }
postController.getSinglePost(request, response, optionObj);
//next();
})
app.post("/post/:category/:id/addComment", (request, response, next) => {
  let userCategory = request.params.category;
  let _id = request.params.id;

  console.log(`This is the url ${request.url}`);
  let optionObj = {
      renderName : "singlePostWithComments"
  }
postController.addComment(request, response);

response.redirect(`/post/${userCategory}/${_id}`)
//next();
})

app.use('/', indexRouter);
app.use('/aboutUs', aboutUsRouter);
app.use('/post/academic', academicRouter);
app.use('/post/career', careerRouter);
app.use('/chat', chatRouter);
app.use('/addPost', addPostRouter);
app.use('/post/research', researchRouter);
app.use('/post/event', eventRouter);
app.use('/post/sport', sportRouter);



app.get('*', function(req, res){
    res.render("404",{url: req.url});
  });
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
