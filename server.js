var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var Handlebars = require('handlebars');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
// exphbs.handlebars;

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
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
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
var crudController = require("./controllers/crudController");

app.get("/post/:category", (request, response, next) => {
  let userCategory = request.params.category;
  console.log(`This is the url ${request.url}`);
  let optionObj = {
    filterBy   : { category : userCategory },
    renderName : userCategory
  }
crudController.getPostList(request, response, optionObj);
//next();
})
app.get("/post/:category/:id", (request, response) => {
  // let userCategory = request.params.category;
  // let _id = request.params.id;

  console.log(`This is the url ${request.url}`);
  let optionObj = {
      renderName : "singlePostWithComments"
  }
crudController.getSinglePost(request, response, optionObj);

})
app.post("/post/:category/:id/addComment", (request, response, next) => {
  let userCategory = request.params.category;
  let _id = request.params.id;
  console.log(request.body)

  console.log(`This is the url ${request.url}`);
  let optionObj = {
      renderName : "singlePostWithComments"
  }
crudController.addComment(request, response);

response.redirect(`/post/${userCategory}/${_id}`)
//next();
})

 /* Handlebars helper function */
Handlebars.registerHelper('calculateTheAmountTimeSincePostOut', function (timeStamp) {
    var result = "";
    var y = timeStamp.getFullYear();
    var m = timeStamp.getMonth() + 1;
    var d = timeStamp.getDate();
    var mm = m < 10 ? '0' + m : m;
    var dd = d < 10 ? '0' + d : d;
    result = '' + y + mm + dd;
  
  var returnResult = moment(result, "YYYYMMDD").fromNow();

  // console.log("returnResultreturnResultreturnResultreturnResult");
  // console.log(returnResult);
  return new Handlebars.SafeString(
    "" + returnResult + ""
  );
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

app.listen(process.env.PORT || 3000, function() {

    console.log('Example app listening on port 3000!');
});
