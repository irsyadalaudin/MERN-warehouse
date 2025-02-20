import multer from 'multer'
import storage from '../config/multerConfig.js'

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    /*
    fileFilter:(req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('the maximum image files is 10 mb!'))
        }
        cb(null, true)
    }
    */
})

    const multerMiddleware = (req, res, next) => {
        upload.single('file')(req, res, (error) => {
            if (error) {
                console.error('multer error:', error)
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