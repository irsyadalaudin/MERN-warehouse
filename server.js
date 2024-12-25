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


/** CONNECTION */
// app.listen(4000, () => {
//     console.log('connected on port http://localhost:4000')
// })

app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})