import express from 'express'
const router = express.Router()
import MongoConnector from '../../../utils/mongo-connector'

import { getFriendships } from '../../../controllers/friendships'

const mongo = new MongoConnector()

router.get('/', mongo.initMW(), getFriendships, mongo.closeMW())

export default router
