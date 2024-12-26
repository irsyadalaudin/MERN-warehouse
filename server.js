import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

/** MIDDLEWARE */
app.get((req, res, next) => {
    console.log(req.path, res.method)
    next()
})

/** ROUTES (REACT TO REQUEST) */
app.use((req, res) => {
    res.json({ message: 'welcome to the app!'})
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})