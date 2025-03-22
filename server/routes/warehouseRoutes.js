/** GET, DELETE, POST METHOD */
import express from 'express'
import warehouseControllers from '../controllers/warehouseControllers.js'
import multerMiddleware from '../middlewares/multerMiddleware.js'

const {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse,
    updateWarehouse
} = warehouseControllers

const router = express.Router()

/** GET ALL WAREHOUSE ITEM */
router.get('/', getWarehouses)

/** GET A SINGLE WAREHOUSE ITEM */
router.get('/:id', getWarehouse)

/** CREATE A NEW WAREHOUSE ITEM - HANDLES FILE UPLOAD AND CREATES A NEW WAREHOUSE ITEM */
// router.post('/', upload.single('file'), createWarehouse)
router.post('/', multerMiddleware, createWarehouse)

/** DELETE A SINGLE WAREHOUSE ITEM */
router.delete('/:id', deleteWarehouse)

/** UPDATE A WAREHOUSE ITEM */
router.patch('/:id', multerMiddleware, updateWarehouse)

export default router