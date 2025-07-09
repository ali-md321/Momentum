const catchAsync = require("../middlewares/catchAsync.js");
const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorhandler.js");
const cloudinary = require("cloudinary").v2;

module.exports.createPost = catchAsync(async(req,res) => {
    let {caption,userId : postedBy} = req.body;
    let url,filename;
    if(caption == "") caption = undefined;
    if(req.file){
        url = req.file.path;
        filename = req.file.filename;
    }
    const post = new Post({caption,image:{ url: url,filename: filename},postedBy});
    await post.save();
    const user = await User.findById(postedBy);
    user.posts.push(post);
    await user.save({ validateBeforeSave: false });
    res.json({
        message : "Post created!!",
        post : post
    })
})

module.exports.showSinglePost = catchAsync(async(req,res) => {
    let {postId} = req.params;
    let post = await Post.findById(postId).populate("postedBy",'_id username avatar')
                                          .populate("comments.user",'_id username avatar')
                                          .populate("likes","_id username avatar");
    res.json({
        singlePost : post
    })
})

module.exports.deletePost = catchAsync(async(req,res) => {
    let {postId} = req.params;
    let delPost = await Post.findByIdAndDelete(postId);
    if(delPost.image.filename != "Default_image"){
        cloudinary.uploader
        .destroy(delPost.image.filename)
    }
    res.json({
        message : "Post Deleted!!",
    })

})

module.exports.showHomePosts = catchAsync(async(req,res) => {
    let homePosts = await Post.find({}).populate("postedBy",'_id username avatar')
                                       .populate("comments.user",'_id username avatar')
                                       .populate("likes","_id username avatar");
    res.json({
        message : "All posts fetched!!",
        homePosts : homePosts,
    })

});

module.exports.addCommentController = catchAsync(async(req,res) => {
    let {postId} = req.params;
    let {comment} = req.body;
    let userId = req.userId;
    const post = await Post.findById(postId);

    post.comments?.push({user : userId,comment});

    await post.save();
    res.json({
        message : "Comment Added!",
        comment : comment
    })
})

module.exports.likeUnlikeController = catchAsync(async(req,res) => {
    let {postId} = req.params;
    let userId = req.userId;

    const post = await Post.findById(postId)
    let isLiked = post.likes.includes(userId);
    if(!isLiked){
        post.likes.push(userId);
    }else{
        post.likes = post.likes.filter(id => id !=userId);
    }
    await post.save();

    res.json({
        message : isLiked ? "User Unliked" : "User Liked"
    })
})

module.exports.saveTogglePostController = catchAsync(async(req,res) => {
    let {postId} = req.params;
    let userId = req.userId;

    let user = await User.findById(userId);
    let post = await Post.findById(postId);

    let isSaved = user.saved.includes(postId);
    if(isSaved){
        user.saved = user.saved.filter(id => id != postId);
        post.savedBy = post.savedBy.filter(id => id != userId);
    }else{
        user.saved.push(postId);
        post.savedBy.push(userId);
    }

    await user.save({ validateBeforeSave: false });
    await post.save();

    res.json({
        message : isSaved ? "Post Unsaved!" : "Post Saved!"
    })
})
