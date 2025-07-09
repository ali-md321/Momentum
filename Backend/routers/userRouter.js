const express = require("express");
const { userSignUp, userLogin, userLogOut,getUserDetailsController, followUserController,searchUserController,editUserController, forgotPasswordController, resetPasswordController } = require("../controllers/userController");
const { validateUserSignUp, validateUserEdit, validatePassword } = require("../middlewares/validation");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

const {upload} = require("../config/cloudConfig");
const { rateLimiter } = require("../middlewares/rateLimiter");

router.post("/signup",rateLimiter(10,60),upload.single('avatar'), validateUserSignUp,userSignUp);
router.post("/login",rateLimiter(10,60), userLogin);
router.get("/logout", isAuthenticated,userLogOut);
router.get("/user/:id", isAuthenticated,getUserDetailsController);
router.patch("/user/me",isAuthenticated,upload.single('avatar'),validateUserEdit,editUserController)
router.post("/follow/:id",isAuthenticated,followUserController)
router.get("/search/:username",isAuthenticated,searchUserController);
router.post("/password/forgot",forgotPasswordController);
router.put("/password/reset/:token", validatePassword,resetPasswordController)

module.exports = router