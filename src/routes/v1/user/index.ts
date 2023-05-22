import express from 'express'
const router = express.Router()
import { closeConn, initConn } from '../../../utils/mongo-connector'

import {
  deleteUser,
  getUser,
  getUsers,
  saveExistingUser,
  saveNewUser,
} from '../../../controllers/user'

router.get('/', initConn, getUsers, closeConn)

router.get('/:id', initConn, getUser, closeConn)

router.post('/', initConn, saveNewUser, closeConn)
router.put('/', initConn, saveExistingUser, closeConn)

router.delete('/', initConn, deleteUser, closeConn)

export default router
