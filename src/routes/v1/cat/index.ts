import express from 'express'
const router = express.Router()

import {
  deleteCat,
  getCat,
  getCats,
  saveExistingCat,
  saveNewCat,
} from '../../../controllers/cat'

router.get('/', getCats)

router.get('/:id', getCat)

router.post('/', saveNewCat)
router.put('/', saveExistingCat)

router.delete('/', deleteCat)

export default router
