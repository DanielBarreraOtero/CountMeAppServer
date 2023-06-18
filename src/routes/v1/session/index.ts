import express from 'express'
import { sessionLogIn } from '../../../controllers/session'
const router = express.Router()

router.post('/login', sessionLogIn)

export default router
