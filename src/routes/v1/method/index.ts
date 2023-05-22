import express from 'express'
const router = express.Router()
import { closeConn, initConn } from '../../../utils/mongo-connector'
import {
  getMethods,
  getMethodsByUser,
  saveNewMethod,
} from '../../../controllers/method'

router.get('/', initConn, getMethods, closeConn)
router.get('/user/:username', initConn, getMethodsByUser, closeConn)
router.post('/', initConn, saveNewMethod, closeConn)

export default router
