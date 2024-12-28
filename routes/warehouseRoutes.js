/** GET, DELETE, POST METHOD */
import express from 'express'
import warehouseControllers from '../controllers/warehouseControllers.js'

const {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse
} = warehouseControllers

const router = express.Router()

/** GATE ALL WAREHOUSE ITEM */
router.get('/', getWarehouses)

/** GATE A SINGLE WAREHOUSE ITEM */
router.get('/:id', getWarehouse)

/** CREATE A NEW WAREHOUSE ITEM */
router.post('/', createWarehouse)

/** DELETE A SINGLE WAREHOUSE ITEM */
router.delete('/:id', deleteWarehouse)

export default router