import multer from 'multer'
import { upload } from '../config/cloudinaryConfig.js'

// TO HANDLE FILE UPLOAD AND ERROR
const multerMiddleware = (req, res, next) => {
    upload.single('file')(req, res, (error) => {
        if (error) {
            console.error('multer error:', error)

            // IF ERROR IS RELATED TO FILE SIZE LIMIT
            if (error instanceof multer.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({ error: 'the maximum image file is 10 mb!' })
                }
            } else if (error) {
                return res.status(500).json({ error: 'an error occurred while uploading the image file!'})
            }
        } else {
            // IF THE FILE IS UPLOADED SUCCESSFULLY, ADD THE public_id AND url TO req.file
            if (req.file) {
                req.file.public_id = req.file.filename  // public_id FROM CLOUDINARY 
                req.file.url = req.file.path            // url FROM CLOUDINARY
            }
            next()
        }
    })
}

export default multerMiddleware