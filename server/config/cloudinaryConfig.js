import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

// LOAD ENVIRONMENT VARIABLES
dotenv.config()

// Cloudinary CONFIGURATION
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SETUP STORAGE CLOUDINARY FOR MULTER
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads',                                            // FOLDER IN CLOUDINARY
        allowed_formats: ['jpg', 'png', 'jpeg'],                      // ALLOWED FORMATS
        transformation: [{ width: 800, height: 600, crop: 'limit' }], // AUTOMATIC IMAGE RESIZE
    }
})

export { cloudinary, storage }