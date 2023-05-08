import express from 'express'
import { sessionLogIn } from '../../../controllers/session'
import MongoConnector from '../../../utils/mongo-connector'
import AuthChecker from '../../../utils/auth-checker'
const router = express.Router()

const mongo = new MongoConnector()

router.post(
  '/login',
  mongo.initMW(),
  sessionLogIn,
  mongo.closeMW(),
)

export default router
