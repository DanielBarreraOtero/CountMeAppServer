import express from 'express'
const router = express.Router()
import MongoConnector from '../../../utils/mongo-connector'

import {
  deleteUser,
  getUser,
  getUsers,
  saveExistingUser,
  saveNewUser,
} from '../../../controllers/user'

const mongo = new MongoConnector()

router.get('/', mongo.initMW(), getUsers, mongo.closeMW())

router.get('/:id', mongo.initMW(), getUser, mongo.closeMW())

router.post('/', mongo.initMW(), saveNewUser, mongo.closeMW())
router.put('/', mongo.initMW(), saveExistingUser, mongo.closeMW())

router.delete('/', mongo.initMW(), deleteUser, mongo.closeMW())

export default router
