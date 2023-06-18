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

import AuthChekcer from '../../../utils/auth-checker'
import Validator from '../../../utils/validator'

const authChekcer = new AuthChekcer()
const validator = new Validator(authChekcer)

router.get('/', authChekcer.authAdmin(), getActivities)
router.get('/user/:username', authChekcer.authUser(), getActivitiesByUser)
router.get('/last/user/:username', authChekcer.authUser(), getLastByUser)
router.post(
  '/',
  authChekcer.authUser(),
  validator.activityPost(),
  saveNewActivity,
)
router.put(
  '/',
  authChekcer.authUser(),
  validator.activityPut(),
  saveExistingActivity,
)
router.delete('/:id', authChekcer.authUser(), deleteActivity)

export default router
