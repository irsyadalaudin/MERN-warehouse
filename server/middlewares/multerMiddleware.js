import multer from 'multer'
// import storage from '../config/multerConfig.js'
import { storage } from '../config/cloudinaryConfig.js'

// SETUP MULTER FROM `config/multerConfig.js` AND FILE LIMIT SIZE
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
})

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
            next()
        }
    })
}

export default multerMiddleware