import express from 'express'
const router = express.Router()
import {
  endActivityExecution,
  endExecution,
  getExecutionsByUser,
  getExecutions,
  saveNewExecution,
  getLastExecutionByUser,
  getExecutionsByUserFormatted,
} from '../../../controllers/execution'
import AuthChecker from '../../../utils/auth-checker'

const authChekcer = new AuthChecker()

router.get('/', authChekcer.authAdmin(), getExecutions)
router.get('/user/:username', authChekcer.authUser(), getExecutionsByUser)
router.get(
  '/format/user/:username',
  authChekcer.authUser(),
  getExecutionsByUserFormatted,
)
router.get(
  '/last/user/:username',
  authChekcer.authUser(),
  getLastExecutionByUser,
)
router.post('/', authChekcer.authUser(), saveNewExecution)
router.put('/endActivity', authChekcer.authUser(), endActivityExecution)
router.put('/end', authChekcer.authUser(), endExecution)

export default router
