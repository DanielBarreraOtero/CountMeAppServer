import express from 'express'
const router = express.Router()
import {
  deleteTimer,
  getTimers,
  getTimersByUser,
  getTimersForBlock,
  saveExistingTimer,
  saveNewTimer,
} from '../../../controllers/timer'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getTimers, closeConn)
router.get('/user/:username', initConn, getTimersByUser, closeConn)
router.get('/:methodId/:blockIndex', initConn, getTimersForBlock, closeConn)
router.post('/', initConn, saveNewTimer, closeConn)
router.put('/', initConn, saveExistingTimer, closeConn)
router.delete('/:id', initConn, deleteTimer, closeConn)

export default router
