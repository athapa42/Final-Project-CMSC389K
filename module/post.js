var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var reviewSchema = new mongoose.Schema({});
/* 
* We need to especifically look at this schema again 
* and add more details like what is required & not
*/
var reviewSchema = new mongoose.Schema({
    userName:    { type: String, required: true },

    timeStamp:   { type: Date, required: true },

    comment:     { type: String },

    likes:       { type: Number },
    
    disLikes:    { type: Number }
});

var postSchema = new mongoose.Schema({
    userName:    { type: String, required: true },

    timeStamp:   { type: Date, required: true },

    category:    { type: String, required: true },

    title:       { type: String, required: true },

    imageUrl:    { type: String},

    description: { type: String, required: true},

    linkUrl:     { type: String },

    reviews: [reviewSchema] 
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;