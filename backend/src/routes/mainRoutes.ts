import { Router } from 'express'
import {
  countriesController,
  placeController,
  placesController,
} from '../controllers/mainControllers'

const router = Router()

router.get('/places', placesController)
router.get('/place/:id', placeController)
router.get('/countires', countriesController)

export default router
