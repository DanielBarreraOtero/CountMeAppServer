import express from 'express'
const router = express.Router()
import { getAcceptedFriendships, getFriendships, getPendingFriendships } from '../../../controllers/friendships'
import { closeConn, initConn } from '../../../utils/mongo-connector'

router.get('/', initConn, getFriendships, closeConn)
router.get('/Accepted/:id', initConn, getAcceptedFriendships, closeConn)
router.get('/Pending/:id', initConn, getPendingFriendships, closeConn)

export default router
