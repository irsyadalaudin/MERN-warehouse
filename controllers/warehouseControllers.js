import Warehouse from '../models/warehouseModels.js'
import mongoose from 'mongoose'

/** GET ALL WAREHOUSE ITEM */
const getWarehouses = async (req, res) => {
    const warehouses = await Warehouse.find({}).sort({ createdAt: -1 })
    res.status(200).json(warehouses)
}

/** GET A SINGLE WAREHOUSE ITEM */
const getWarehouse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'no such warehouse!' })
    }

    try {
        const warehouse = await Warehouse.findById(id)

        if (!warehouse) {
            return res.status(400).json({ message: 'no such warehouse!' })
        } else {
            return res.status(200).json(warehouse)
        }
    } catch {
        res.status(500).json({ message: 'an error occurred while fetching the warehouse item!' })
    }
}


/** CREATE A NEW WAREHOUSE ITEM */
const createWarehouse = async (req, res) => {
    const {itemName, quantity, price} = req.body

    try {
        const warehouse = await Warehouse.create({itemName, quantity, price})
        res.status(200).json(warehouse)
    } catch {
        res.status(400).json({message: 'an error occurred while crearting the warehouse item!'})
    }
}


export default {
    getWarehouses,
    getWarehouse,
    createWarehouse
}