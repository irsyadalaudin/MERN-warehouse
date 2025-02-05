import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')                     // SAVE IMAGES IN THE 'public/images' FOLDER
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)  // RENAME FILE WITH TIMESTAMP
    }
})

const upload = multer({ storage })
export default upload
