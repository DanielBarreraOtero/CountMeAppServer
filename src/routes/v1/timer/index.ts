import express from 'express'
const router = express.Router()
import { getTimers, saveNewTimer } from '../../../controllers/timer'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getTimers, closeConn)
router.post('/', initConn, saveNewTimer, closeConn)

export default router
