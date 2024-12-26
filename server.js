import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import wokoutRoutes from './routes/serverRoutes.js'

const app = express()

/** MIDDLEWARE */
app.get((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

/** ROUTES (REACT TO REQUEST) */
app.use('/api/warehouse' ,wokoutRoutes)

/** CONNECTION (LISTEN FOR REQUEST) */
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})