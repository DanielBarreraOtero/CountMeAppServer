import express from 'express'
const router = express.Router()
import {
  deleteMethod,
  getMethods,
  getMethodsByUser,
  saveExistingMethod,
  saveNewMethod,
} from '../../../controllers/method'
import AuthChecker from '../../../utils/auth-checker'

const authChekcer = new AuthChecker()

router.get('/', authChekcer.authAdmin(), getMethods)
router.get('/user/:username', authChekcer.authUser(), getMethodsByUser)
router.post('/', authChekcer.authUser(), saveNewMethod)
router.put('/', authChekcer.authUser(), saveExistingMethod)
router.delete('/:id', authChekcer.authUser(), deleteMethod)

export default router
