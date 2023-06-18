import express from 'express'
const router = express.Router()
import {
  getAcceptedFriendships,
  getFriendships,
  getPendingFriendships,
} from '../../../controllers/friendships'
import AuthChecker from '../../../utils/auth-checker'

const authChekcer = new AuthChecker()

router.get('/', authChekcer.authAdmin(), getFriendships)
router.get('/Accepted/:id', authChekcer.authUser(), getAcceptedFriendships)
router.get('/Pending/:id', authChekcer.authUser(), getPendingFriendships)

export default router
