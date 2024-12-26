/** GET, DELETE, POST METHOD */
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({message: 'GET all workouts'})
})

export default router