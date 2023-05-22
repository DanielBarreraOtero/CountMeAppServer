import express from 'express'
import { sessionLogIn } from '../../../controllers/session'
import { closeConn, initConn } from '../../../utils/mongo-connector'
const router = express.Router()

router.post('/login', initConn, sessionLogIn, closeConn)

export default router
