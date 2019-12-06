/*The purpose of this class is to populate with fake data */
const mongoose = require("mongoose");
var dotenv = require('dotenv');
var faker = require('faker');
var Post = require('./module/post')

// store credentials as environment variables
const dbuser = process.env.USER
const dbpass = process.env.PASS
// Load envirorment variables
dotenv.config();


// these 4 .set statements are recommended in mongoose site
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to MongoDB
console.log(process.env.MONGODB)
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.

mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/* Post schema to take a look for
    userName:    { type: String, required: true },
    timeStamp:   { type: Date, required: true },
    category:    { type: String, required: true },
    title:       { type: String, required: true },
    imageUrl:    { type: String },
    description: { type: String, required: true },
    linkUrl:     { type: String },
    like:        { type: Number },
    disLike:     { type: Number },
    reviews: [reviewSchema] 
*/

/* Saving Single Post
let newPost = new Post({
    userName: "NahomTes",
    timeStamp: new Date(),
    category: "academic",
    title: "What was the avarage curve for CMSC351",
    imageUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png",
    description: "New description New description New description New description New description",
    linkUrl: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png",
    like: 0,
    disLike: 0,
    reviews: []
});

Post.create(newPost)
    .then((results) => {
        console.log("everything looks good!");
        console.log(results);
    })
    .catch((reject) => {
        console.log("looks like it didn't pass well: " + reject);
        mongoose.connection.close();
    });
*/
/*  Comment schema to take a look for
userName:    { type: String, required: true },
timeStamp:   { type: Date, required: true },
comment:     { type: String },
like:       { type: Number },
disLike:    { type: Number }
*/





var categoryArray = ["academic", "career", "event", "research", "sport"];

// Create/save Fake data into our DataBase.
function populateDB(optionObj) {
    let newPosts = [];
    for (let i = 0; i < optionObj.numberOfPost; i++) {
        let newReviews = [];
        let date = new Date();
        for (let j = 0; j < i; j++) {
            let l = 0
            let d = 0;
            
            if (j % 5 !== 0) {
                l = 1;
                date = faker.date.between(optionObj.dateFrom, optionObj.dateTo);
            }
            else {
                d = 1;
            }
            let aComment = {
                userName: faker.internet.userName(),
                timeStamp: date,
                comment: faker.lorem.paragraph(),
                like: l,
                disLike: d
            }
            newReviews.push(aComment);
        }


        let aPost = {
            userName: faker.internet.userName(),
            timeStamp: date,
            category: category = categoryArray[Math.floor(Math.random() * categoryArray.length)],
            title: faker.lorem.sentence(),
            imageUrl: faker.image.imageUrl(),
            description: faker.lorem.paragraph(),
            linkUrl: faker.internet.url(),
            like: numberOfLikes(newReviews),
            disLike: numberOfDisLikes(newReviews),
            reviews: newReviews
        }
        newPosts.push(aPost)
    }
    return newPosts;
}
// Runing the function.
var optionObjToPass = {
    numberOfPost : 10,
    dateFrom     : '2019-12-06',
    dateTo       : new Date()
}
let newPosts = populateDB(optionObjToPass)

function numberOfLikes(reviewsObj) {
    let counter = 0;
    reviewsObj.forEach(element => {
        counter += element.like;
    })
    return counter;
}
function numberOfDisLikes(reviewsObj) {
    let counter = 0;
    reviewsObj.forEach(element => {
        counter += element.disLike;
    })
    return counter;
}

function postCreate(postObj) {
    return Post.create({
        userName: postObj.userName,
        timeStamp: postObj.timeStamp,
        category: postObj.category,
        title: postObj.title,
        imageUrl: postObj.imageUrl,
        description: postObj.description,
        linkUrl: postObj.linkUrl,
        like: postObj.like,
        disLike: postObj.disLike,
        reviews: postObj.reviews
    });
}

postPromises = [];
newPosts.forEach(aPostObj => {
    postPromises.push(postCreate(aPostObj));
})
Promise.all(postPromises)
    .then((results) => {
        console.log("everything looks good!");
        console.log(results);
        mongoose.connection.close();
    })
    .catch((reject) => {
        console.log("looks like something went wrong: " + reject);
        mongoose.connection.close();
    });

