import express from 'express'
const router = express.Router()

import user from './user/index'
import session from './session/index'
import friendships from './friendships'
import activities from './activity'
import timers from './timer'
import methods from './method'
import execution from './execution'

router.use('/user', user)
router.use('/session', session)
router.use('/friendship', friendships)
router.use('/activity', activities)
router.use('/timer', timers)
router.use('/method', methods)
router.use('/execution', execution)

export default router
