const { required } = require("joi");
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    caption : {
        type : String,
        default : "Just Posting!!",
    },
    image : {
        url : {
            type : String,
            default : "https://res.cloudinary.com/djqk9esdt/image/upload/v1750678758/Default_image.jpg",
        },
        filename : {
            type : String,
            default : "Default_image"
        }
    },
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    savedBy : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        }
    ],
    comments : [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ],
},{ timestamps: true } )

postSchema.post("findOneAndDelete",async(post) => {
    if(post){
        const owner = await User.findById(post.postedBy);
        owner.posts = owner.posts.filter(id => id != post._id);
        const savedUsers = await User.find({_id : {$in : post.savedBy}});
        savedUsers.saved = savedUsers.saved.filter(id => id != post._id);
    }
})

module.exports = mongoose.model("Post",postSchema);