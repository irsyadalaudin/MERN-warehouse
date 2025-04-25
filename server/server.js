import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import warehouseRoutes from './routes/warehouseRoutes.js'
import warehouseMiddleware from './middlewares/warehouseMiddleware.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

/** MIDDLEWARE */
app.use(express.json())

/** CUSTOM MIDDLEWARE FOR HANDLING WAREHOUSE-RELATED LOGIC */
app.use(warehouseMiddleware)

/** ROUTES HANDLER FOR ALL REQUESTS (REACT TO REQUEST) */
app.use('/api/warehouse', warehouseRoutes)

/** REDIRECT ROOT URL */
app.get('/', (req, res) => {
    res.redirect('api/warehouse')
})

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
    console.log(`server is running on http://localhost:${process.env.PORT}/api/warehouse`)
})