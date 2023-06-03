import express from 'express'
const router = express.Router()
import {
  getTimers,
  getTimersByUser,
  getTimersForBlock,
  saveNewTimer,
} from '../../../controllers/timer'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getTimers, closeConn)
router.get('/user/:username', initConn, getTimersByUser, closeConn)
router.get('/:methodId/:blockIndex', initConn, getTimersForBlock, closeConn)
router.post('/', initConn, saveNewTimer, closeConn)

export default router
