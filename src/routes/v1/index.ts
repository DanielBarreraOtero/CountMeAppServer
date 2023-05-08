import express from 'express'
const router = express.Router()

import cat from './cat/index'
import user from './user/index'
import session from './session/index'
import friendships from './friendships'

router.use('/cat', cat)
router.use('/user', user)
router.use('/session', session)
router.use('/friendships', friendships)

export default router
