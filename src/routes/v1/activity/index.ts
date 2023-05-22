import express from 'express'
const router = express.Router()
import {
  getActivites,
  getActivitesByUser,
  saveNewActivity,
} from '../../../controllers/activity'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getActivites, closeConn)
router.get('/user/:username', initConn, getActivitesByUser, closeConn)
router.post('/', initConn, saveNewActivity, closeConn)

export default router
