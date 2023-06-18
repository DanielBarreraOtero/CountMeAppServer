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
import AuthChecker from '../../../utils/auth-checker'

const authChekcer = new AuthChecker()

router.get('/', authChekcer.authAdmin(), getTimers)
router.get('/user/:username', authChekcer.authUser(), getTimersByUser)
router.get('/:methodId/:blockIndex', authChekcer.authUser(), getTimersForBlock)
router.post('/', authChekcer.authUser(), saveNewTimer)
router.put('/', authChekcer.authUser(), saveExistingTimer)
router.delete('/:id', authChekcer.authUser(), deleteTimer)

export default router
