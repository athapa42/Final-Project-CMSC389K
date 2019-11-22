var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var reviewSchema = new mongoose.Schema({});
// We need to add more property for the schema
var reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});

var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 0,
        max: 2019,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    reviews: [reviewSchema] 
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;