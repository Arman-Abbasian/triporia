import { RequestHandler, Router } from 'express'
import {
  countriesController,
  placeController,
  placesController,
} from '../controllers/mainControllers'

const router = Router()

router.get('/places', placesController as RequestHandler)
router.get('/place/:id', placeController as RequestHandler)
router.get('/countires', countriesController as RequestHandler)

export default router
