import express from 'express'
const router = express.Router()
import {
  deleteActivity,
  getActivities,
  getActivitiesByUser,
  getLastByUser,
  saveExistingActivity,
  saveNewActivity,
} from '../../../controllers/activity'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getActivities, closeConn)
router.get('/user/:username', initConn, getActivitiesByUser, closeConn)
router.get('/last/user/:username', initConn, getLastByUser, closeConn)
router.post('/', initConn, saveNewActivity, closeConn)
router.put('/', initConn, saveExistingActivity, closeConn)
router.delete('/:id', initConn, deleteActivity, closeConn)

export default router
