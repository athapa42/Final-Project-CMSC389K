/*
* This is a module that define all of the controller methods that
* will be used as callbacks to our endpoints under routes folder.
*/
let Post = require('../module/post');
let mongoose = require('mongoose');


/*                  ******************* [ READ ] *******************                  */

// Retrieve list of all POST and render them using the handlebar
function getPostList(req, res, optionObj) {

  Post.find(optionObj.filterBy)
              .then(listOfPost => {
                console.log("Retrieving all the post was successful. \n");
                res.render(optionObj.renderName, { data: listOfPost })
               // return listOfPost;
              })
              .catch(reject => {
                console.log("GET ALL POST ERROR");
                res.status(500).send('There was error retriving All the posts. Error: ' + reject)
              });
};

// Retrieve detail info for a specific post.
function getSinglePost(req, res, optionObj) {
  let _id = mongoose.Types.ObjectId(req.params.id);
  if(mongoose.Types.ObjectId.isValid(_id)) {
    console.log(`${_id} is valid mongodb ID`);
  }else {console.log(`ERROR ${_id} is Invalid mongodb ID`);}
  Post.findById(_id)
                          .then(singlePostWithComments => {
                            console.log(`Retrieving single element By Id ${_id} was successful.\n`);
                            console.log(singlePostWithComments);
                            res.render(optionObj.renderName, { data: singlePostWithComments })
                          })
                          .catch(reject => {
                            console.log("GET SINGLE POST ERROR");
                            res.status(500).send(`There was error retriving single post ${req.params.id}. Error: ${reject}`)
                          });
};

/*                  ******************* [ CREATE ] *******************                  */

// Handle to save a POST.
function createPost(req, res) {

  let postData = new Post(req.body);
  postData["timeStamp"] = new Date();
  postData.like = 0;
  postData.disLike = 0;
  console.log(postData);

  Post.create(new Post(postData))
                                .then(createdPost => {
                                  console.log("Post has been successfully Created/Saved into database.\n");
                                  console.log(createdPost);
                                  res.redirect("/");
                                })
                                .catch(reject => {
                                  console.log("CREATE POST ERROR");
                                  res.status(500).send('Error Creating/Saving the Post into database. ' + reject);
                                });
};

/*                 ******************* [ UPDATE ] *******************                 */
function addComment(req, res){
  //let id = req.params.id;
  let id = mongoose.Types.ObjectId(req.params.id);
  /*if(mongoose.Types.ObjectId.isValid(id)) {
    console.log(`mongooseDBBBBB ${id} is valid mongodb ID`);
  }else {console.log(`mongooseDBBBBB ERROR ${id} is Invalid mongodb ID`);}
  console.log("add-commentid")

  console.log(id);*/
  let commentObj = req.body;
  // if(document.getElementById('like-rate').checked) {
  //   alert("like checked")
  // }else if(document.getElementById('disLike-rate').checked) {
  //   alert("disLike checked")  }
  var like = 0;
  var disLike = 0;
  var likeDisLike = parseInt(req.body["like-DisLike"]);
  console.log(`wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww ${req.body["like-DisLike"]} ${typeof req.body["like-DisLike"]}`)
  if (likeDisLike === 1){
    // console.log("Like selected");
    like = 1;
  }
  if (likeDisLike === 0){
    // console.log("DisLike selected");
    disLike = 1;
  }


  commentObj.timeStamp = new Date();
  commentObj.like = like;
  commentObj.disLike = disLike;


  Post.update(
    { "_id": id},
    {
        $push: {
          reviews: commentObj
        }
    }
).then(result => {
  console.log("ADD Comment: Comment has been Added into DataBases.");
  updateLikeAndDislike(id, like, disLike);
}).catch(reject => {
  console.log(`ADD Comment: ERROR adding comment into DB. Error ${reject}`)
});


}

function updateLikeAndDislike(id, like, disLike, req, res){

  Post.findById(id)
  .then(singlePostWithComments => {
    console.log(`ADD Comment: Retrieving single element By Id ${id} was successful.\n`);
    console.log(`like: ${like}, typeof ${typeof like} disLike: ${disLike}, typeof ${typeof disLike}`)
    singlePostWithComments.like += like;
    singlePostWithComments.disLike += disLike;
    
    console.log(`singlePostWithComments.like ${singlePostWithComments.like}`);
    console.log(`singlePostWithComments.disLike ${singlePostWithComments.disLike}`);
   
    Post.findByIdAndUpdate(id,
      { $set: singlePostWithComments}, { new: true })
                                      .then(result=> {
                                        console.log(`ADD Comment: Updating has been successful for ${id} ID`);
                                        // res.status(204).send('');
                                      })
                                      .catch(reject =>{
                                        console.log("ADD Comment: UPDATING POST ERROR");
                                        // res.status(500).send(`Error updating a post with ${req.params.id} Id.
                                                              // Error Message: ${reject}`);
                                      });
    
  }).catch(reject => {
    console.log(`ADD Comment: GET SINGLE POST ERRORrrrrrrrrr: ${reject}`);
    // res.status(500).send(`There was error retriving single post ${req.params.id}. Error: ${reject}`)
  });

 
}

function updatePost(req, res) {
  Post.findByIdAndUpdate(req.params.id,
    { $set: req.body }, { new: true })
                                    .then(result=> {
                                      console.log(`Updating has been successful for ${req.params.id} ID`);
                                      res.status(204).send('');
                                    })
                                    .catch(reject =>{
                                      console.log("UPDATING POST ERROR");
                                      res.status(500).send(`Error updating a post with ${req.params.id} Id.
                                                            Error Message: ${reject}`);
                                    });
};

/*                  ******************* [ DELETE ] *******************                  */

// Handle Post on DELETE.
function deletePost(req, res) {
  let _id = req.params.id
  Post.findByIdAndDelete(_id)
                            .then(result => {
                              console.log(`Removing a post with ${_id} was successful.`)
                              res.status(204).send('removed')
                            })
                            .catch(reject => {
                              console.log(``)
                              res.status(500).send(`There was error when updating the post with ${req.params.id} id.
                                                    Error Message: ${reject}`)
                            });
};


/*
* The above functionaly are being exported, so that it could be used from
* each of our endpoints under the routes folder to handle the incoming request
*/
module.exports = {
  getPostList   : getPostList,
  getSinglePost : getSinglePost,
  createPost    : createPost,
  updatePost    : updatePost,
  deletePost    : deletePost,
  addComment    : addComment

}
