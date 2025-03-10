import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Konfigurasi Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup storage Cloudinary untuk Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'uploads', // Folder di Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Format yang diperbolehkan
        transformation: [{ width: 800, height: 600, crop: 'limit' }], // Resize gambar otomatis
    }
})

export { cloudinary, storage }