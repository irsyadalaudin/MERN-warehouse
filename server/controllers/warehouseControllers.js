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
        return res.status(404).json({message: 'no warehouse item matches the id!'})
    }

    try {
        const warehouse = await Warehouse.findById(id)

        if (!warehouse) {
            return res.status(400).json({message: 'no warehouse item matches the id!'})
        } else {
            return res.status(200).json(warehouse)
        }
    } catch {
        res.status(500).json({message: 'an error occurred while fetching the warehouse item!'})
    }
}


/** CREATE A NEW WAREHOUSE ITEM */
const createWarehouse = async (req, res) => {
    const {itemName, quantity, weight, weightDetails} = req.body

    // IF A FILE IS UPLOADED, SAVE ITS path; OTHERWISE, SET FILE TO null
    // const file = req.file ? `/images/${req.file.filename}` : null
    const file = req.file ? req.file.path : null

    try {
        const warehouse = await Warehouse.create({itemName, quantity, weight, weightDetails, file})
        res.status(200).json(warehouse)
    } catch {
        res.status(400).json({message: 'an error occurred while crearting the warehouse item!'})
    }
}

/** DELETE A NEW WAREHOUSE ITEM */
const deleteWarehouse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: 'no warehouse item matches the id!'})
    }

    try {
        const warehouse = await Warehouse.findOneAndDelete({_id:id})

        if (!warehouse) {
            return res.status(400).json({message: 'no such warehouse item has been deleted!'})
        } else {
            return res.status(200).json(warehouse)
        }
    } catch {
        res.status(500).json({message: 'an occurred while deleting the warehouse item!'})
    }
}

/** EDIT A NEW WAREHOUSE ITEM */
const updateWarehouse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no warehouse item matches the id!'})
    }

    try {
        // CHECK IF THERE ARE NEW FILES UPLOADED
        const file = req.file ? `/images/${req.file.filename}` : null

        const warehouse = await Warehouse.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
                // IF THERE IS A NEW FILE, SET THE NEW FILE, OTHERWISE KEEP THE OLD FILE
                // IF THE FILE IS NULL, UNDEFINED KEEPS THE OLD FILE IN THE DB
                file: file || undefined
            },
            // TO RETURN THE LATEST DATA
            { new: true }
        )

        if (!warehouse) {
            return res.status(400).json({message: 'no such warehouse item has been updated!'})
        } else {
            return res.status(200).json(warehouse)
        }
    } catch (error) {
        res.status(500).json({message: 'an error occurred while updating the warehouse item!', error})
    }
}

export default {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    deleteWarehouse,
    updateWarehouse
}