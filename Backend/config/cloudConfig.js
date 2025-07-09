const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

const postStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Momentum_post_DEV',
      allowedFormats: ['png','jpg','jpeg','webp'],
    },
  });

//To temporary store
const multer = require('multer');
const storage = multer.memoryStorage(); // Keep in memory, not uploading yet
const upload = multer({ storage });


module.exports = {
    cloudinary,
    postStorage,
    upload
}