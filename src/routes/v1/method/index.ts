import express from 'express'
const router = express.Router()
import { closeConn, initConn } from '../../../utils/mongo-connector'
import {
  deleteMethod,
  getMethods,
  getMethodsByUser,
  saveExistingMethod,
  saveNewMethod,
} from '../../../controllers/method'

router.get('/', initConn, getMethods, closeConn)
router.get('/user/:username', initConn, getMethodsByUser, closeConn)
router.post('/', initConn, saveNewMethod, closeConn)
router.put('/', initConn, saveExistingMethod, closeConn)
router.delete('/:id', initConn, deleteMethod, closeConn)

export default router
