import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')                     // SAVE IMAGES IN THE 'public/images' FOLDER
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)  // RENAME FILE WITH TIMESTAMP
    }
})

// const multerConfig = multer({ 
//     storage,
//     // limits: { fileSize: 10 * 1024 * 1024 }
// })
// export default multerConfig

export default storage