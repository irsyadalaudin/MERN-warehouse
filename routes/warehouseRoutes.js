/** GET, DELETE, POST METHOD */
import express from 'express'
import Warehouse from '../models/warehouseModels.js'

const router = express.Router()

/** GATE ALL WAREHOUSE ITEM */
router.get('/', (req, res) => {
    res.json({message: 'get all warehouse items'})
})

/** GATE A SINGLE WAREHOUSE ITEM */
router.get('/:id', (req, res) => {
    res.json({message: 'get a single warehouse item'})
})

router.post('/', async (req, res) => {
    const {itemName, quantity, price} = req.body

    try {
        const warehouse = await Warehouse.create({itemName, quantity, price})
        res.status(200).json(warehouse)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default router