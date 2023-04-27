import express from 'express'
const router = express.Router()

import cat from './cat/index'

router.use('/cat', cat)

export default router
