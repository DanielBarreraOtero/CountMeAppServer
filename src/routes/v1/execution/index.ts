import express from 'express'
const router = express.Router()
import {
  endActivityExecution,
  endExecution,
  getExecutionsByUser,
  getExecutions,
  saveNewExecution,
  getLastExecutionByUser,
} from '../../../controllers/execution'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getExecutions, closeConn)
router.get('/user/:username', initConn, getExecutionsByUser, closeConn)
router.get('/last/user/:username', initConn, getLastExecutionByUser, closeConn)
router.post('/', initConn, saveNewExecution, closeConn)
router.put('/endActivity', initConn, endActivityExecution, closeConn)
router.put('/end', initConn, endExecution, closeConn)

export default router
