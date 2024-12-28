/** GET, DELETE, POST METHOD */
import express from 'express'
import warehouseControllers from '../controllers/warehouseControllers.js'

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

/** CREATE A NEW WAREHOUSE ITEM */
router.post('/', createWarehouse)

/** DELETE A SINGLE WAREHOUSE ITEM */
router.delete('/:id', deleteWarehouse)

/** UPDATE A WAREHOUSE ITEM */
router.patch('/:id', updateWarehouse)

export default router