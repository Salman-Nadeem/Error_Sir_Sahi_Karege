// utils/imageUpload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary Configuration (from your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret : process.env.CLOUD_API_SECRET_KEY,
});

// Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Crud_Images',  // Folder in Cloudinary where the image will be uploaded
    allowed_formats: ['jpg', 'jpeg', 'png'],  // Supported image formats
  },
});

// Multer upload middleware using Cloudinary storage
const upload = multer({ storage: storage });


module.exports = upload;
