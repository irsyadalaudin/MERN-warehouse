import mongoose from 'mongoose'

/** EXTRACT schema FROM mongoose */
const { Schema } = mongoose

/** DEFINE THE WAREHOUSE schema */
const WarehouseSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    file: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Warehouse = mongoose.model('Warehouse',WarehouseSchema)
export default Warehouse