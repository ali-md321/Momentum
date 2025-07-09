const express = require("express");
const multer  = require('multer')
const { showHomePosts, createPost, deletePost,showSinglePost,addCommentController,likeUnlikeController,saveTogglePostController } = require("../controllers/postController");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const { postStorage } = require("../config/cloudConfig");
const uploadPost = multer({storage : postStorage});

router.get("/homeposts",isAuthenticated,showHomePosts);
      
router.post("/posts",isAuthenticated,uploadPost.single('image'),createPost)

router.route("/post/:postId")
      .delete(isAuthenticated,deletePost)
      .get(isAuthenticated,showSinglePost);

router.route("/comment/:postId")
      .post(isAuthenticated,addCommentController)

router.route("/like/:postId")
      .post(isAuthenticated,likeUnlikeController);

router.route("/save/:postId")
      .post(isAuthenticated,saveTogglePostController);

module.exports = router;
