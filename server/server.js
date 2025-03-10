import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import warehouseRoutes from './routes/warehouseRoutes.js'
import warehouseMiddleware from './middlewares/warehouseMiddleware.js'

const app = express()

/** MIDDLEWARE */
app.use(express.json())
app.use(warehouseMiddleware)

/** ROUTES (REACT TO REQUEST) */
app.use('/api/warehouse', warehouseRoutes)
/** SERVES STATIC IMAGE FILES FROM THE 'public/images' DIRECTORY */
// app.use('/images', express.static('public/images'))

/** CONNECT TO DB */
mongoose.connect(process.env.MONGO_URI, { dbName: 'warehouse' })
    .then(() => {
        console.log('connected to database')
    })
    .catch((error) => {
        console.error('database connection failed', error.message)
    })

/** CONNECTION (LISTEN FOR REQUEST) */
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})