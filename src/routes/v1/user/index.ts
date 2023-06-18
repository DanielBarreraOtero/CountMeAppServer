import express from 'express'
const router = express.Router()

import {
  deleteUser,
  getUser,
  getUsers,
  saveExistingUser,
  saveNewUser,
} from '../../../controllers/user'
import AuthChecker from '../../../utils/auth-checker'

const authChekcer = new AuthChecker()

router.get('/', authChekcer.authAdmin(), getUsers)
router.get('/:id', authChekcer.authUser(), getUser)
router.post('/', saveNewUser)
router.put('/', authChekcer.authUser(), saveExistingUser)
router.delete('/', authChekcer.authUser(), deleteUser)

export default router
